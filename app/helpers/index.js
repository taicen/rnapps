import Supercluster from 'supercluster';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import { setLocation } from '../redux/location';

export const watchPosition = store => {
  const id = navigator.geolocation.watchPosition(({ coords }) => {
    store.dispatch(
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }),
    );
  });
  return id;
};

export const clearWatchPosition = id => {
  navigator.geolocation.clearWatch(id);
};

export const getCurrentPosition = store => {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      store.dispatch(
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      );
    },
    errors => {
      Alert.alert('Включите геолокацию!', '', [{ text: 'Закрыть' }]);
    },
  );
};

export const centerBetweenCoordinates = coords => {
  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  coords.forEach(coord => {
    const latitude = (coord.latitude * Math.PI) / 180;
    const longitude = (coord.longitude * Math.PI) / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  });

  const total = coords.length;

  x /= total;
  y /= total;
  z /= total;

  const centralLongitude = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLatitude = Math.atan2(z, centralSquareRoot);

  return {
    latitude: (centralLatitude * 180) / Math.PI,
    longitude: (centralLongitude * 180) / Math.PI,
  };
};

export const degreesToRadians = degrees => (degrees * Math.PI) / 180;

export const coordsDistMeters = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const newlat1 = degreesToRadians(lat1);
  const newlat2 = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(newlat1) * Math.cos(newlat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseInt(earthRadiusKm * c * 1000, 10);
};

export const getZoomLevel = longitudeDelta => {
  const angle = longitudeDelta;
  return Math.round(Math.log(360 / angle) / Math.LN2);
};

export const getCluster = (places, region) => {
  const cluster = new Supercluster({
    radius: 120,
    maxZoom: 15,
    nodeSize: 64,
  });
  let markers = [];
  try {
    const padding = 0;
    cluster.load(places);
    markers = cluster.getClusters(
      [
        region.longitude - region.longitudeDelta * (0.5 + padding),
        region.latitude - region.latitudeDelta * (0.5 + padding),
        region.longitude + region.longitudeDelta * (0.5 + padding),
        region.latitude + region.latitudeDelta * (0.5 + padding),
      ],
      getZoomLevel(region.longitudeDelta),
    );
  } catch (e) {
    console.log('failed to create cluster', e);
  }
  return {
    markers,
    cluster,
  };
};

export const plural = (number, vars) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return vars[2];
  }
  n %= 10;
  if (n === 1) {
    return vars[0];
  }
  if (n >= 2 && n <= 4) {
    return vars[1];
  }
  return vars[2];
};

export const stationListBuilder = list => {
  const res = list.reduce((out, station) => {
    if (station && station.lat && station.lng) {
      const geometry = {
        coordinates: [parseFloat(station.lng), parseFloat(station.lat)],
      };
      const coordinates = [parseFloat(station.lng), parseFloat(station.lat)];
      const is_active = !parseInt(station.is_not_active, 10);
      out.push({
        id: parseInt(station.id, 10),
        name: {
          ru: station.name_ru,
          kz: station.name_kz,
          en: station.name_en,
        },
        address: {
          ru: station.address_ru,
          kz: station.address_kz,
          en: station.address_en,
        },
        coordinates,
        geometry,
        is_deleted: parseInt(station.is_deleted, 10),
        is_hidden: parseInt(station.is_hidden, 10),
        is_active,
        is_sales: parseInt(station.is_sales, 10),
        code: station.code,
      });
    }
    return out;
  }, []);

  return res;
};

export const stationBuilder = station => {
  const avl_bikes = parseInt(station.avl_bikes, 10);
  const free_slots = parseInt(station.free_slots, 10);
  // const total_slots = parseInt(station.total_slots)
  return {
    id: station.id,
    code: station.code,
    location: {
      latitude: parseFloat(station.lat),
      longitude: parseFloat(station.lng),
    },
    avl_bikes: {
      ru: `${avl_bikes} велосипед${plural(avl_bikes, ['', 'а', 'ов'])}`,
      kz: `${avl_bikes} велосипед${plural(avl_bikes, ['', 'тер', 'тер'])}`,
      en: `${avl_bikes} bicycle${plural(avl_bikes, ['', 's', 's'])}`,
    },
    free_slots: {
      ru: `${free_slots} слот${plural(free_slots, ['', 'а', 'ов'])}`,
      kz: `${free_slots} слот${plural(free_slots, ['', 'тер', 'тер'])}`,
      en: `${free_slots} slot${plural(free_slots, ['', 's', 's'])}`,
    },
    total_slots: parseInt(station.total_slots, 10),
    name: {
      ru: station.name_ru,
      kz: station.name_kz,
      en: station.name_en,
    },
    desc: {
      ru: station.desc_ru,
      kz: station.desc_kz,
      en: station.desc_en,
    },
    address: {
      ru: station.address_ru,
      kz: station.address_kz,
      en: station.address_en,
    },
  };
};

export const formBuilder = params => {
  const formData = new FormData();
  Object.entries({
    tokenApi: Config.TOKEN_API_ALM,
    ...params,
  }).forEach(item => {
    formData.append(item[0], item[1]);
  });
  return formData;
};

export const regCode = param => {
  const formData = new FormData();
  Object.entries({ ...param }).forEach(item => {
    formData.append(item[0], item[1]);
  });
  return formData;
};

export function normalizePhone(phone, withPlus = false) {
  if (withPlus) return phone.replace(/[^+0-9]/g, '');
  return phone.replace(/[^0-9]/g, '');
}

export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

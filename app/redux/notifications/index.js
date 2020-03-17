import 'whatwg-fetch';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

let token;
AsyncStorage.getItem('user_token').then(tkn => {
  token = tkn;
  //console.log('>>>>>> Notification', token);
});

export const types = {
  FETCH_NOTIFICATIONS_REQUEST: 'FETCH_NOTIFICATIONS_REQUEST',
  FETCH_NOTIFICATIONS_SUCCESS: 'FETCH_NOTIFICATIONS_SUCCESS',
  FETCH_NOTIFICATIONS_FAILURE: 'FETCH_NOTIFICATIONS_FAILURE',
  GET_NOTIFICATION_REQUEST: 'GET_NOTIFICATION_REQUEST',
  GET_NOTIFICATION_SUCCESS: 'GET_NOTIFICATION_SUCCESS',
  GET_NOTIFICATION_FAILURE: 'GET_NOTIFICATION_FAILURE',
  LOAD_MORE_NOTIFICATIONS_REQUEST: 'LOAD_MORE_NOTIFICATIONS_REQUEST',
  TOGGLE_NOTIFICATION: 'TOGGLE_NOTIFICATION'
};

export const fetchNotificationsRequest = () => ({
  type: types.FETCH_NOTIFICATIONS_REQUEST
});

export const loadMoreNotificationsRequest = () => ({
  type: types.LOAD_MORE_NOTIFICATIONS_REQUEST
});

export const fetchNotificationsSuccess = data => ({
  type: types.FETCH_NOTIFICATIONS_SUCCESS,
  data
});

export const fetchNotificationsFailure = error => ({
  type: types.FETCH_NOTIFICATIONS_FAILURE,
  data: error
});

export const toggleNotification = data => ({
  type: types.TOGGLE_NOTIFICATION,
  data
});

export const fetchStatusNotifications = data => dispatch => {
  dispatch(toggleNotification(data));
};

export const fetchNotifications = page => dispatch => {
  if (page === 1) {
    dispatch(fetchNotificationsRequest());
  } else {
    dispatch(loadMoreNotificationsRequest());
  }
  const formData = new FormData();
  formData.append('tokenApi', 'KCN8J#Jjip_#fjp#(UR)#RI8JFE2@9ufJ#)J)*(GCRMOIuhgUJJEIF#)(FH');
  formData.append('token', token);
  formData.append('limit', 20);
  formData.append('offset', page == 1 ? 0 : page * 20 - 20);
  fetch(`${Config.API_URL}/member/notifications`, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      console.log('fetchNotifications', res);
      dispatch(fetchNotificationsSuccess(res));
    })
    .catch(e => {
      console.log('e.response', e);
      dispatch(fetchNotificationsFailure(e));
    });
};

export const getNotificationRequest = () => ({
  type: types.GET_NOTIFICATION_REQUEST
});

export const getNotificationSuccess = data => ({
  type: types.GET_NOTIFICATION_SUCCESS,
  data
});

export const getNotificationFailure = error => ({
  type: types.GET_NOTIFICATION_FAILURE,
  data: error
});

export const getNotification = id => dispatch => {
  dispatch(getNotificationRequest());
  fetch(`https://velobike.kz/api/stations/get/${id}`)
    .then(res => res.json())
    .then(res => {
      dispatch(getNotificationSuccess(res[0]));
      // stationBuilder(res[0])
    })
    .catch(e => {
      console.log('e', e);
      dispatch(getNotificationFailure(e.response));
    });
};

// const getAsyncStorage = async () => {
//   let noticeOn = '';
//   try {
//     await AsyncStorage.getItem('notification_on').then(res => {
//       console.log('NOTICE RESULT', res);

//       noticeOn = res || false;
//       toggleNotification({notice_on: noticeOn})
//     })
//   } catch (error) {
//     // Error retrieving data
//     console.log(error.message);
//   }
// }

export const initialState = {
  fetch_notifications_in_progress: false,
  fetch_notifications_error: null,
  notification_list: null,
  get_notification_in_progress: false,
  get_notification_error: null,
  notification: null,
  notification_on: '',
  notification_count: 0,
  load_more_in_progress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        fetch_notifications_in_progress: true
      };
    case types.LOAD_MORE_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        load_more_in_progress: true
      };
    case types.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetch_notifications_in_progress: false,
        notification_list:
          state.notification_list != null
            ? Object.assign({}, state.notification_list, action.data.notifications)
            : action.data.notifications,
        notification_count: action.data.count,
        load_more_in_progress: false
      };
    case types.FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetch_notifications_in_progress: false,
        fetch_notifications_error: action.data,
        load_more_in_progress: false
      };
    case types.GET_NOTIFICATION_REQUEST:
      return {
        ...state,
        get_notification_in_progress: true
      };
    case types.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        get_notification_in_progress: false,
        notification: action.data
      };
    case types.GET_NOTIFICATION_FAILURE:
      return {
        ...state,
        get_notification_in_progress: false,
        get_notification_error: action.data
      };
    case types.TOGGLE_NOTIFICATION:
      AsyncStorage.setItem('notification_on', JSON.stringify(action.data.notice_on));
      return {
        ...state,
        notification_on: action.data.notice_on
      };
    default:
      return state;
  }
};

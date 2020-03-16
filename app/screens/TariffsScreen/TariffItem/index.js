import React from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Style } from './style';
import Button from '../../../components/ui/Button';

// IMAGE IMPORTS
import yearImg from '../../../../assets/images/tariff-year.png';
import quarterImg from '../../../../assets/images/tariff-quarter.png';
import monthImg from '../../../../assets/images/tariff-month.png';

const TariffItem = ({ name, comment, price, order, mainColor, navigation }) => {
  /*  
    <== PROPS OF THIS COMPONENT ==>
      - name - the name of the tariff,
      - comment - the comment of description of the tariff
      - price - price of the comment
      - order - order of elements to render image
    <== END ==> 
  */

  setDurationImage = () => {
    if (order === 2) return yearImg;
    if (order === 1) return quarterImg;
    return monthImg;
  };

  return (
    <View style={Style.item}>
      <Image style={Style.image} source={setDurationImage()} />
      <View style={Style.itemInner}>
        <Text style={Style.h2}>{name}</Text>
        {/* <Text style={Style.del}>{data.oldCost}</Text> */}
        <Text style={[Style.cost, { color: mainColor }]}>{price}</Text>
        <Text style={Style.desc}>{comment}</Text>
        <Text style={Style.label}>Почасовая оплата</Text>
        {/* table */}
        <View style={Style.table}>
          {/* row */}
          <View style={Style.row}>
            {/* column */}
            <Text style={[Style.col1, Style.colLabel]}>мин</Text>
            {/* column */}
            <Text style={[Style.col2, Style.colLabel]}>тенге</Text>
          </View>

          <View style={Style.row}>
            <Text style={Style.col1}>30</Text>
            <Text style={Style.col2}>Бесплатно</Text>
          </View>

          <View style={Style.row}>
            <Text style={Style.col1}>
              31-60
              {/* <Text style={Style.dots}>...............................</Text> */}
            </Text>
            <Text style={Style.col2}>100</Text>
          </View>

          <View style={Style.row}>
            <Text style={Style.col1}>61-121</Text>
            <Text style={Style.col2}>250</Text>
          </View>

          <View style={Style.row}>
            <Text style={Style.col1}>120-180</Text>
            <Text style={Style.col2}>500</Text>
          </View>

          <View style={Style.row}>
            <Text style={Style.col1}>>180</Text>
            <Text style={Style.col2}>1000</Text>
          </View>
        </View>

        <Button onPress={() => navigation.navigate('MakePay')} title="Оформить тариф" />
      </View>
    </View>
  );
};

export default connect(({ themeChanger }) => ({
  mainColor: themeChanger.main_color,
}))(TariffItem);

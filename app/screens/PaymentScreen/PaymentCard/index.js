import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../constants';

const PaymentCard = ({ title, date, description, amount, id, type, ...props }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>{amount} ₸</Text>
      <View style={styles.row}>
        <Text style={styles.date}>#{id}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  card: {
    padding: 15,
    backgroundColor: '#F9F8F7',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontFamily: fonts.RobotoSlabRegular,
    fontSize: 18,
    color: '#54575A',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#949BA1',
    marginBottom: 5,
    fontFamily: fonts.OpenSansRegular,
  },
  description: {
    fontSize: 14,
    color: '#1F2021',
  },
  amount: {
    fontFamily: fonts.RobotoSlabBold,
    fontSize: 18,
    color: '#54575A',
  },
});

export default PaymentCard;

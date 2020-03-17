import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../constants';

const NotificationCart = ({ title, date, description, ...props }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#ffffff',
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
    fontSize: 10,
    color: '#949BA1',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#1F2021',
  },
});

export default NotificationCart;

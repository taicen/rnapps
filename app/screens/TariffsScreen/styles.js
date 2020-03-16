import React from 'react';
import { StyleSheet } from 'react-native';
import { fonts } from '../../constants';

export const Style = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontFamily: fonts.RobotoSlabBold,
    color: '#54575A',
  },
  h2: {
    fontFamily: fonts.RobotoSlabBold,
    fontSize: 22,
    color: '#54575A',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#84888D',
    marginTop: 5,
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    color: '#1F2021',
    marginBottom: 10,
  },
  status: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 50,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 'auto',
  },
  statDesc: {
    height: 180,
    paddingHorizontal: 45,
    paddingVertical: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F9F8F7',
    borderRadius: 5,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 20,
    color: '#1F2021',
    textAlign: 'center',
    marginBottom: 15,
  },
});

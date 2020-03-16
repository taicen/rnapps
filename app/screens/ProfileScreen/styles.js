import { StyleSheet } from 'react-native';
import { fonts } from '../../constants';

export const styles = StyleSheet.create({
  profileWrap: {
    paddingHorizontal: 16,
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  user: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 150,
    marginLeft: 0,
  },
  username: {
    fontFamily: fonts.RobotoSlabBold,
    fontSize: 18,
    fontWeight: '700',
    color: '#54575a',
  },
  userId: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    fontSize: 12,
    fontWeight: '400',
    color: '#84888D',
  },
  editBtn: {
    marginBottom: 0,
  },
  profileBody: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
  },
  profileRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileCol: {
    width: '50%',
  },
  profileColLong: {
    width: '80%',
  },
  label: {
    fontSize: 12,
    color: '#84888d',
    marginBottom: 10,
  },
  labelObj: {
    fontSize: 16,
    color: '#000000',
  },
});

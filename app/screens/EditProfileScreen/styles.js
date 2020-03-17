import { StyleSheet } from 'react-native';
import { fonts } from '../../constants';

export const styles = StyleSheet.create({
  editHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  editChangePhoto: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
    width: 150,
  },
  editBody: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
    paddingBottom: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  editRowShort: {
    width: '45%',
  },
});

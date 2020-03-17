import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStations } from '../../redux/stations';
import { getCallbackForm } from '../../redux/support';
import { fetchStatusNotifications } from '../../redux/notifications';
import { fetchStatusRoad } from '../../redux/stations';
import { setTheme } from '../../redux/themeChanger';
import MainScreen from '../../screens/MainScreen';

export default connect(
  ({ stations, themeChanger }) => ({
    stations,
    mainColor: themeChanger.main_color,
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchStations,
        setTheme,
        fetchStatusNotifications,
        fetchStatusRoad,
        getCallbackForm,
      },
      dispatch,
    ),
)(MainScreen);

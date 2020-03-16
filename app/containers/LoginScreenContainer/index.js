import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../redux/auth';
import { logoutReset } from '../../redux/logout';
import { LoginScreen } from '../../screens';

export default connect(
  ({ auth, themeChanger }) => ({
    auth,
    mainColor: themeChanger.main_color,
  }),
  dispatch =>
    bindActionCreators(
      {
        login,
        logoutReset,
      },
      dispatch,
    ),
)(LoginScreen);

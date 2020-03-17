import { connect } from 'react-redux';
import { RegistrationScreen } from '../../screens';

export default connect(state => ({
  mainColor: state.themeChanger.main_color,
}))(RegistrationScreen);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCode, sendPassCode, newPass } from '../../redux/forgetPassword';
import { ForgetPasswordScreen } from '../../screens';

export default connect(
  ({ forgetPassword, themeChanger }) => ({
    isSaved: forgetPassword.code_is_saved,
    isSend: forgetPassword.sms_is_send,
    inProgress: forgetPassword.pass_change_in,
    isDone: forgetPassword.pass_changed,
    mainColor: themeChanger.main_color,
  }),
  dispatch =>
    bindActionCreators(
      {
        saveCode,
        sendPassCode,
        newPass,
      },
      dispatch,
    ),
)(ForgetPasswordScreen);

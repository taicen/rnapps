import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPayment } from '../../redux/payments';
import { profileData } from '../../redux/profile';
import { SinglePaymentScreen } from '../../screens';

export default connect(
  ({ payments, profile }) => ({
    payments,
    profile_data: profile.profile_data,
  }),
  dispatch =>
    bindActionCreators(
      {
        getPayment,
        profileData,
      },
      dispatch,
    ),
)(SinglePaymentScreen);

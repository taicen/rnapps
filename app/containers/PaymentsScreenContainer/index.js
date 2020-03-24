import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPayments } from '../../redux/payments';
import { profileData } from '../../redux/profile';
import { PaymentScreen } from '../../screens';

export default connect(
  ({ payments, profile }) => ({
    payments,
    profile_data: profile.profile_data,
    token: profile.profile_token || null,
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchPayments,
        profileData,
      },
      dispatch,
    ),
)(PaymentScreen);

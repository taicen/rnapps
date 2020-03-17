import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNotifications } from '../../redux/notifications';
import { NotificationScreen } from '../../screens';

export default connect(
  ({ notifications }) => ({
    notifications,
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchNotifications,
      },
      dispatch,
    ),
)(NotificationScreen);

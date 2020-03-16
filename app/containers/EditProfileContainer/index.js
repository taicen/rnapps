import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { profileData } from '../../redux/profile';
import { editProfile, editPassword } from '../../redux/editProfile';
import { EditProfileScreen } from '../../screens';

export default connect(
  ({ profile }) => ({
    loading: profile.loading,
    profile: profile.profile_data,
    photos: profile.profile_photo,
    moderation: profile.profile_data.confirmed === 'Y' ? true : false,
    approved: profile.profile_data.confirmed === 'P' ? true : false,
  }),
  dispatch =>
    bindActionCreators(
      {
        editProfile,
        editPassword,
        profileData,
      },
      dispatch,
    ),
)(EditProfileScreen);

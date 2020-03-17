import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
import { PhotographIcon, FacebookIcon, GoogleIcon, DocsIconSmall } from '../../components/svg';
import { styles } from './styles';
import { FormInput, Button, ButtonInline, ButtonSocial } from '../../components/ui';
import FormTextarea from '../../components/ui/FormTextarea';
import SelectField from '../../components/ui/SelectField';
import { onlyNumbers } from '../../helpers';

const options = {
  title: 'Загрузите фото',
  takePhotoButtonTitle: 'Снять на камеру',
  chooseFromLibraryButtonTitle: 'Выбрать из галереи',
  cameraType: 'front',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const lang = [
  {
    label: 'Русский',
    value: 'ru_RU',
  },
  {
    label: 'Казахский',
    value: 'kz_KZ',
  },
  {
    label: 'Английский',
    value: 'en_EN',
  },
];

const gender = [
  {
    label: 'Мужской',
    value: 'Мужской',
  },
  {
    label: 'Женский',
    value: 'Женский',
  },
];

// let source = undefined;
// let sourceToPass = undefined;
// let docSourceFront = undefined;
// let docSourceFrontToPass = undefined;
// let docSourceBack = undefined;
// let docSourceBackToPass = undefined;

class EditProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      language: undefined,
      disabled: true,
      sourceToPass: null,
      docSourceFrontToPass: null,
      docSourceBackToPass: null,
    };
  }

  handleImagePicker = response => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      // sourceToPass = response.uri;
      const file = {
        ...response,
        name: response.fileName,
        size: response.fileSize,
      };
      //source = `data:image/jpeg;base64,${response.data}`;
      this.setState({ sourceToPass: file });
    }
  };

  handleImagePickerDocsFront = response => {
    // console.log("Response = ", response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      //docSourceFrontToPass = response.uri;
      const file = {
        ...response,
        name: response.fileName,
        size: response.fileSize,
      };
      //docSourceFront = `data:image/jpeg;base64,${response.data}`;
      this.setState({ docSourceFrontToPass: file });
    }
  };
  handleImagePickerDocsBack = response => {
    // console.log("Response = ", response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      //docSourceBackToPass = response.uri;
      const file = {
        ...response,
        name: response.fileName,
        size: response.fileSize,
      };
      //docSourceBack = `data:image/jpeg;base64,${response.data}`;
      this.setState({ docSourceBackToPass: file });
    }
  };

  submit = values => {
    const { editProfile, profileData, editPassword, profile, photos } = this.props;
    const { language, sourceToPass, docSourceFrontToPass, docSourceBackToPass } = this.state;
    const [first_name, last_name] = profile.name.split(' ');
    //const passed = !approved && moderation;

    // const smallData = {
    //   ...profile,
    //   photo_1: sourceToPass ? sourceToPass : photos.photo_1,
    //   email: values.email ? values.email : profile.email,
    //   lang_bike: language ? language : profile.lang_bike,
    //   about_me: values.about_me ? values.about_me : profile.about_me
    // };
    const data = {
      photo_1: sourceToPass ? sourceToPass : photos.photo_1,
      iin: values.iin ? values.iin : profile.iin,
      first_name: values.first_name ? values.first_name : first_name,
      last_name: values.last_name ? values.last_name : last_name,
      email: values.email ? values.email : profile.email,
      phone_number: values.phone_number ? values.phone_number : profile.phone_number,
      photo_2: docSourceFrontToPass ? docSourceFrontToPass : photos.photo_2,
      photo_3: docSourceBackToPass ? docSourceBackToPass : photos.photo_3,
      lang_bike: language ? language : profile.lang_bike,
      about_me: values.about_me ? values.about_me : profile.about_me,
    };

    editProfile(data).then(res => {
      console.log('EDIT >>>>> PROFILE', res);
      if (res.success) {
        profileData();
      }
    });

    const password_data = {
      current_password: values.current_password,
      password: values.password,
    };
    if (password_data.current_password && password_data.password && values.password_new) {
      if (password_data.password === values.password_new) {
        editPassword(password_data);
      } else {
        alert('Пароли не совпадают');
      }
    }
  };

  renderLoad = color => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      }}
    >
      <ActivityIndicator size="large" color={color} />
    </View>
  );

  render() {
    const {
      navigation,
      handleSubmit,
      photos,
      loading,
      profile,
      approved,
      moderation,
      mainColor,
    } = this.props;
    const [first_name, last_name] = profile.name.split(' ');
    const { sourceToPass } = this.state;

    const passed = !approved && moderation;

    if (loading) return this.renderLoad(mainColor);

    return (
      <DropdownMenuLayout
        navigation={navigation}
        noDropdown
        arrowBack
        screenName="РЕДАКТИРОВАТЬ ПРОФИЛЬ"
      >
        <KeyboardAwareScrollView enableResetScrollToCoords={false}>
          {/* header start  */}
          <View style={styles.editHeader}>
            <Image
              style={styles.profilePhoto}
              source={{
                uri: sourceToPass ? sourceToPass.uri : photos.photo_1,
              }}
            />
            <TouchableOpacity
              style={styles.editChangePhoto}
              onPress={() =>
                ImagePicker.launchCamera(options, response => {
                  // Same code as in above section!
                  this.handleImagePicker(response);
                })
              }
            >
              <PhotographIcon />
              <Text style={{ color: '#787878', fontSize: 14, marginLeft: 7 }}>Сделать новое</Text>
            </TouchableOpacity>
          </View>

          {/* body start */}
          <View style={styles.editBody}>
            {!passed && (
              <Fragment>
                <Field
                  component={FormInput}
                  name="iin"
                  label="ИИН"
                  //placeholder={profile.iin}
                  defaultValue={profile.iin}
                  disable
                  width="50%"
                />

                <Field
                  component={FormInput}
                  name="first_name"
                  label="Имя"
                  placeholder={first_name}
                  defaultValue={profile.first_name}
                  disable
                />

                <Field
                  component={FormInput}
                  name="last_name"
                  label="Имя"
                  placeholder={last_name}
                  defaultValue={profile.last_name}
                  disable
                />
              </Fragment>
            )}

            {/* Email field */}
            <Field
              component={FormInput}
              name="email"
              defaultValue={profile.email}
              label="Эл. адрес"
            />

            {/* Phone number field */}
            {!passed && (
              <Fragment>
                <Field
                  component={FormInput}
                  name="phone_number"
                  label="Номер телефона"
                  width={120}
                  containerPropsStyle={{
                    width: '60%',
                  }}
                  phoneInput
                  disable
                  placeholder={profile.phone_number}
                />

                {/* Docs upload field */}
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#54575A',
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                  >
                    Документ подтверждающий личность
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginTop: 0,
                      width: '100%',
                      borderRadius: 100,
                      backgroundColor: '#f2f2f2',
                      paddingVertical: 10,
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}
                    onPress={() =>
                      ImagePicker.showImagePicker(options, this.handleImagePickerDocsFront)
                    }
                  >
                    <DocsIconSmall front />
                    <Text style={{ textAlign: 'center', marginLeft: 10 }}>
                      Загрузить лицевую сторону
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 0,
                      width: '100%',
                      borderRadius: 100,
                      backgroundColor: '#f2f2f2',
                      paddingVertical: 10,
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    onPress={() =>
                      ImagePicker.showImagePicker(options, this.handleImagePickerDocsBack)
                    }
                  >
                    <DocsIconSmall />
                    <Text style={{ textAlign: 'center', marginLeft: 10 }}>
                      Загрузить обратную сторону
                    </Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}

            {/* language field */}
            <Field
              component={SelectField}
              placeholder="Выберите язык"
              label="Язык"
              name="lang_bike"
              items={lang}
              key={() => {
                return lang.map(key => {
                  return key.value;
                });
              }}
              onValueChange={value => {
                this.setState({ language: value });
              }}
            />

            {/* City field */}
            {!passed && (
              <Fragment>
                <Field
                  component={SelectField}
                  placeholder="Выберите пол"
                  name="gender"
                  label="Пол"
                  items={gender}
                  key={() => {
                    gender.map(key => {
                      return key.value;
                    });
                  }}
                  onValueChange={value => {
                    this.setState({ gender: value });
                  }}
                />

                {/* Accounts set */}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#54575A',
                    marginTop: 35,
                  }}
                >
                  Связь аккаунта
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}
                >
                  <ButtonSocial
                    title="Связать с фейсбук"
                    style={{ minWidth: '48%' }}
                    backgroundColor="#F2F2F2"
                    height={35}
                    Icon={<FacebookIcon />}
                  />
                  <ButtonSocial
                    title="Отвязать от Google"
                    style={{ minWidth: '48%' }}
                    backgroundColor="#F7E6E6"
                    height={35}
                    Icon={<GoogleIcon />}
                  />
                </View>
              </Fragment>
            )}

            {/* About field */}
            <Field
              component={FormTextarea}
              name="about_me"
              label="О себе"
              placeholder="Расскажите о себе"
              containerPropsStyle={{ marginTop: 30 }}
              supportTextarea
            />

            {/* Password change fields */}
            {!passed && (
              <Fragment>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1F2021',
                    marginTop: 35,
                  }}
                >
                  Изменение пароля
                </Text>
                <Field
                  component={FormInput}
                  name="current_password"
                  label="Старый пароль"
                  passwordInput
                />
                <Field component={FormInput} name="password" label="Новый пароль" passwordInput />
                <Field
                  component={FormInput}
                  name="password_new"
                  label="Подтвердите новый пароль"
                  passwordInput
                />
              </Fragment>
            )}

            {/* Save buttons */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 40,
              }}
            >
              <Button
                title="Сохранить"
                style={{
                  minWidth: '50%',
                }}
                onPress={handleSubmit(this.submit)}
              />
              <ButtonInline
                title="Отмена"
                color="#000000"
                style={{
                  minWidth: '50%',
                  fontSize: 16,
                  textAlign: 'center',
                }}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* <BottomBlock>
          <BottomTabs navigation={navigation} />
        </BottomBlock> */}
      </DropdownMenuLayout>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   editProfile: v => dispatch(editProfile(v))
// });

const mapStateToProps = state => {
  return {
    initialValues: state.profile.profile_data,
    mainColor: state.themeChanger.main_color,
  };
};

EditProfileScreen = reduxForm({
  form: 'edit-profile',
  enableReinitialize: true,
})(EditProfileScreen);

export default connect(mapStateToProps)(EditProfileScreen);

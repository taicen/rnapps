/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { profileData } from '../../redux/profile';

// eslint-disable-next-line import/no-cycle
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';

import { BottomBlock } from '../../components/blocks';

import { EditIcon } from '../../components/svg';
import { styles } from './styles';

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    const { profileData: profileDataAction, profile } = this.props;
    if (!profile.profile_data) {
      profileDataAction();
    }
  }

  render() {
    const {
      navigation,
      profile: { profile_data, profile_photo },
    } = this.props;

    if (!profile_data) return null;

    return (
      <DropdownMenuLayout navigation={navigation} screenName="Настройки профиля">
        <ScrollView style={styles.profileWrap}>
          <View style={styles.profileHeader}>
            <Image style={styles.profilePhoto} source={{ uri: profile_photo.photo_1 }} />

            <View style={styles.user}>
              <Text style={styles.username}>{profile_data.name}</Text>
              <Text style={styles.userId}>ID{profile_data.id}</Text>
            </View>
            {profile_data.confirmed !== 'P' ? (
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <EditIcon />
              </TouchableOpacity>
            ) : (
              <Text>На рассмотрении</Text>
            )}
          </View>

          <View style={styles.profileBody}>
            <View style={styles.profileRow}>
              <View style={styles.profileCol}>
                <Text style={styles.label}>Вид абонемента</Text>
                <Text style={styles.labelObj}>
                  {profile_data.card && profile_data.card.length ? profile_data.card : 'Не выбран'}
                </Text>
              </View>
              <View style={styles.profileCol}>
                <Text style={styles.label}>Баланс</Text>
                <Text style={styles.labelObj}>{profile_data.balance} T</Text>
              </View>
            </View>

            <View style={styles.profileRow}>
              <View style={styles.profileCol}>
                <Text style={styles.label}>Год рождения</Text>
                <Text style={styles.labelObj}>
                  {profile_data.birthday && profile_data.birthday.length
                    ? profile_data.birthday
                    : 'Не указан'}
                </Text>
              </View>
              <View style={styles.profileCol}>
                <Text style={styles.label}>Пол</Text>
                <Text style={styles.labelObj}>
                  {profile_data.gender ? profile_data.gender : 'Не выбран'}
                </Text>
              </View>
            </View>

            <View style={styles.profileRow}>
              <View style={styles.profileCol}>
                <Text style={styles.label}>ИИН</Text>
                <Text style={styles.labelObj}>
                  {profile_data.iin.length ? profile_data.iin : 'Не указан'}
                </Text>
              </View>
              <View style={styles.profileCol}>
                <Text style={styles.label}>Номера телефонов</Text>
                <Text style={styles.labelObj}>
                  {profile_data.phone.length ? profile_data.phone : 'Не указан'}
                </Text>
              </View>
            </View>

            <View style={styles.profileRow}>
              <View style={styles.profileColLong}>
                <Text style={styles.label}>Электронная почта</Text>
                <Text style={styles.labelObj}>
                  {profile_data.email.length ? profile_data.email : 'Не указан'}
                </Text>
              </View>
            </View>

            <View style={styles.profileRow}>
              <View style={styles.profileColLong}>
                <Text style={styles.label}>Документ подтверждающий личность</Text>
                <Text style={styles.labelObj}>
                  {/* {profile_data.passport.length
                    ? profile_data.passport
                    : "Информация не подтверждена"} */}
                  {profile_data.passport}
                </Text>
              </View>
            </View>

            <View style={styles.profileRow}>
              <View style={styles.profileCol}>
                <Text style={styles.label}>Язык</Text>
                <Text style={styles.labelObj}>
                  {profile_data.lang_bike === 'ru_RU'
                    ? 'Русский'
                    : profile_data.lang_bike === 'en_EN'
                    ? 'English'
                    : 'Казахский'}
                </Text>
              </View>
              <View style={styles.profileCol}>
                <Text style={styles.label}>Город</Text>
                <Text style={styles.labelObj}>Алматы</Text>
              </View>
            </View>

            <View style={styles.profileRow}>
              <View style={styles.profileColLong}>
                <Text style={styles.label}>О себе</Text>
                <Text style={styles.labelObj}>{profile_data.about_me}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomBlock />
        {/* </View>
        <BottomBlock>
          <BottomTabs navigation={navigation} />
        </BottomBlock> */}
      </DropdownMenuLayout>
    );
  }
}

export default connect(
  ({ profile }) => ({
    profile,
  }),
  { profileData },
)(ProfileScreen);

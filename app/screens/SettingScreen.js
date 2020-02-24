import React from 'react';
import { StyleSheet, Image, Switch } from 'react-native';
import { theme, mocks } from '../constants';
import { Button, Block, Text, Divider } from '../components';

import Slider from 'react-native-slider';

export default class SettingsScreen extends React.Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
  };
  render() {
    const { profile } = this.props;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Settings
          </Text>
          <Button>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between">
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Username
                </Text>
                <Text bold>{profile.username}</Text>
              </Block>
              <Text medium secondary>
                Edit
              </Text>
            </Block>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Location
              </Text>
              <Text bold>{profile.location}</Text>
            </Block>
            <Text medium secondary>
              Edit
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                E-mail
              </Text>
              <Text bold>{profile.email}</Text>
            </Block>
            <Text medium secondary>
              Edit
            </Text>
          </Block>
          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
          <Block style={styles.sliders}>
            <Block>
              <Text gray2>Budget</Text>
              <Slider
                minimumValue={0}
                maximumValue={1000}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.budget}
                onValueChange={value => this.setState({ budget: value })}
              />
              <Text caption gray2 right>
                $1,000
              </Text>
            </Block>
            <Block>
              <Text gray2>Monthly Cap</Text>
              <Slider
                minimumValue={0}
                maximumValue={5000}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.monthly}
                onValueChange={value => this.setState({ monthly: value })}
              />
              <Text caption gray2 right>
                $5,000
              </Text>
            </Block>
          </Block>
          <Divider />
          <Block style={styles.toggles}>
            <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
              <Text gray2>Notifications</Text>
              <Switch
                value={this.state.notifications}
                onValueChange={value => this.setState({ notifications: value })}
              />
            </Block>

            <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
              <Text gray2>Newsletter</Text>
              <Switch
                value={this.state.newsletter}
                onValueChange={value => this.setState({ newsletter: value })}
              />
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

SettingsScreen.defaultProps = {
  profile: mocks.profile,
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});

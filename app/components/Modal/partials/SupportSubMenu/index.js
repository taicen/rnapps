import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { sendCallback } from '../../../../redux/support';
import { hideMessage } from '../../../../redux/common';

import { FormTextarea } from '../../../ui';

//import theme from "./../../../../styles/theme.style";
import modalStyles from '../../../../styles/ModalLists';
import { successMessage } from '../../../../styles';

class SupportSubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
      activeSections: this.props.activeSections,
      activeSubtype: null,
      item: '',
    };
  }

  submit = values => {
    this.props.sendCallback(this.state.activeSections, this.state.activeSubtype, values.problem);
  };

  componentDidUpdate(prevProps) {
    if (this.props.activeSections !== prevProps.activeSections) {
      this.setState({
        activeSections: this.props.activeSections,
      });
    }
    if (this.props.common.resultMessage !== prevProps.common.resultMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
  }

  componentDidMount() {
    const { dataObj } = this.props;
    const activeSubtype = Object.keys(dataObj)[this.state.selectedItem];
    this.setState({ activeSubtype });
  }

  _onPressItem = (selectedItem, item) => {
    this.props.hideMessage();
    const { dataObj } = this.props;
    const activeSubtype = Object.keys(dataObj).find(key => dataObj[key] === item);
    this.setState({ selectedItem, item, activeSubtype });
    this.props.dispatch(reset('support'));
  };

  _renderItem = ({ item, index }) => {
    //this.props.dispatch(reset("support"));
    const {
      handleSubmit,
      mainColor,
      support: { callback_sended },
      common: { resultMessage, appInProgress },
    } = this.props;
    const isSelected = this.state.selectedItem === index;
    // const color = isSelected ? theme.PRIMARY_COLOR : null
    const color = isSelected ? mainColor : null;

    return (
      <View>
        <TouchableOpacity
          onPress={() => this._onPressItem(index, item)}
          style={[modalStyles.subMenuListItem, index == 0 && modalStyles.firstSubMenuListItem]}
        >
          <Text style={{ color: color }}>{item}</Text>
        </TouchableOpacity>
        {isSelected && (
          <View>
            <Field
              component={FormTextarea}
              placeholder="Напишите свою проблему"
              supportTextarea
              name="problem"
              inProgress={appInProgress}
              onPress={handleSubmit(this.submit)}
              containerPropsStyle={{ marginTop: 30 }}
            />
            {resultMessage && callback_sended && (
              <Text style={successMessage}>{resultMessage}</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  render() {
    const {
      data,
      support: { callback_sended },
      common: { resultMessage, appInProgress },
    } = this.props;
    return (
      <View style={modalStyles.subMenuContainer}>
        {/* <FlatList
          data={data}
          inProgress={appInProgress}
          success={callback_sended}
          extraData={this.state}
          style={modalStyles.subMenuContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          message={resultMessage}
        /> */}
        {data.map((item, index) => {
          return <View key={index.toString()}>{this._renderItem({ item, index })}</View>;
        })}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendCallback: (type, subtype, message) => dispatch(sendCallback(type, subtype, message)),
  hideMessage: () => dispatch(hideMessage()),
});

const mapStateToProps = state => ({
  support: state.support,
  common: state.common,
  mainColor: state.themeChanger.main_color,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'support',
  })(SupportSubMenu),
);

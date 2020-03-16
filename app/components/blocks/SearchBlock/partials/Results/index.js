import React, { Fragment, Component } from "react";
import {
  Modal,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  findNodeHandle
} from "react-native";
import { ArrowRightSmall, PinIcon } from "../../../../svg";
import { viewportHeight, viewportWidth } from "../../../../../constants";
import { MSContextConsumer } from "../../../../../context/MainScreenContext";
import { BlurView } from "@react-native-community/blur";

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRefState: null
    };
  }

  renderBlur = () => {
    if (this.state.viewRefState) {
      return (
        <BlurView
          style={styles.BlurView}
          blurType="light"
          blurAmount={10}
          viewRef={this.state.viewRefState}
        />
      );
    } else {
      return null;
    }
  };

  componentDidMount() {
    this.setState({ viewRefState: findNodeHandle(this.contentContainer) });
    // this.state.viewRefState
    console.log(
      "🐞: Results -> componentDidMount -> this.state.viewRefState",
      this.state.viewRefState
    );
  }

  render() {
    const { navigation, data, token, color } = this.props;
    const { viewRefState } = this.state;
    console.log("🐞: Results -> render -> viewRefState", this.contentContainer);

    if (viewRefState === null && viewRefState === undefined) return null;
    return (
      /*
        <== MSContextConsumer (Main Screen Context Consumer) - consumer, which takes provided data from Main Screen context ==>
      */
      <MSContextConsumer>
        {({ showListHandler, showListState, showResultsHandler }) => (
          <Fragment>
            <View
              ref={viewBlur => (this.contentContainer = viewBlur)}
              style={[
                styles.wrapper,
                {
                  minHeight: showListState
                    ? 44
                    : viewportHeight - (viewportHeight / 100) * 25
                }
              ]}>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.ShowOnMap}
                  onPress={() => {
                    showListHandler(true);
                    showResultsHandler(false);
                    console.log("touch works");
                  }}>
                  <View style={{ marginRight: 15 }}>
                    <PinIcon color={color} />
                  </View>
                  <Text>Выбрать на карте</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <FlatList
                  style={[
                    styles.resultList
                    // { display: showListState ? "none" : "flex" }
                  ]}
                  data={data}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() =>
                        navigation.navigate("Station", {
                          id: item.id,
                          token: token
                        })
                      }>
                      <View>
                        <Text style={styles.itemName}>{item.name.ru}</Text>
                        <Text style={styles.itemAddress}>
                          {item.address.ru}
                        </Text>
                      </View>
                      <ArrowRightSmall />
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <View style={styles.notFound}>
                      <Text style={styles.notFoundText}>
                        Станция не найдена
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            {this.renderBlur()}
            {/* <BlurView
              style={styles.BlurView}
              blurType="light"
              blurAmount={10}
              viewRef={this.state.viewRefState}
            /> */}
          </Fragment>
        )}
      </MSContextConsumer>
    );
  }
}

// --- STYLES --- //
const styles = StyleSheet.create({
  BlurView: {
    position: "absolute",
    width: viewportWidth,
    height: viewportHeight,
    top: -12,
    bottom: 0,
    left: 0,
    right: 0
  },
  wrapper: {
    position: "absolute",
    top: 60,
    bottom: 0,
    borderRadius: 15,
    width: "100%",
    // height: "100%",
    marginHorizontal: 10,
    overflow: "hidden",
    elevation: 2,
    zIndex: 20
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    elevation: 3
  },
  resultList: {
    // display: "none",
    backgroundColor: "#fff",
    // flex: 1,
    // height: "auto",
    elevation: 4
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#dfdfdf",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemName: {
    fontSize: 14,
    color: "#191D30"
  },
  itemAddress: {
    fontSize: 11,
    color: "#A5AAAF"
  },
  notFound: {
    padding: 30,
    alignItems: "center"
  },
  notFoundText: {
    fontSize: 24,
    color: "#aaa"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderTopColor: "#eee",
    zIndex: 25,
    elevation: 5
  },
  ShowOnMap: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 27,
    elevation: 6
  }
});

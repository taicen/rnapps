import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MSContextConsumer } from "../../../../../context/MainScreenContext";
import { shadowBoxStyles } from "../../../../../styles";

export const ShowList = () => (
  /*
    <== MSContextConsumer (Main Screen Context Consumer) - consumer, which takes provided data from Main Screen context ==>
  */
  <MSContextConsumer>
    {({ showListHandler, showListState, showResultsHandler }) => (
      <TouchableOpacity
        style={[styles.ShowList, { display: showListState ? "flex" : "none" }]}
        onPress={() => {
          showListHandler(false);
          showResultsHandler(true);
        }}>
        <Text style={styles.title}>Показать список</Text>
      </TouchableOpacity>
    )}
  </MSContextConsumer>
);

// --- STYLES --- //
const styles = StyleSheet.create({
  ShowList: {
    // position: "absolute",
    // bottom: 0,
    width: "100%",
    height: 50,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 14,
    color: "#b0b0b0",
    letterSpacing: 2,
    textTransform: "uppercase",
    ...shadowBoxStyles
  }
});

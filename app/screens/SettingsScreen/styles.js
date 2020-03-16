import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 15
  },
  item: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#dfdfdf",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 14,
    color: "#191D30",
    marginBottom: 3
  },
  desc: {
    fontSize: 12,
    color: "#A5AAAF"
  }
});

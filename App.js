// @flow
import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import CustomShape from "./Shape";
import Draggable from "./Circle2";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomShape /> */}
      <Draggable />
      {/* <ScrollView> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5FCFF",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
  },
});

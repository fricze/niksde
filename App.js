import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Elements from "./Elements";

const breaks = [100, 200, 300];

const elements = ["a", "b"];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5FCFF",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
  },

  line: {
    position: "absolute",
    top: 0,

    borderColor: "#DE76CE",
    borderStyle: "solid",
    borderWidth: 0.5,
    width: 0,
    zIndex: 5,

    backgroundColor: "#fff",
    height: "100%",
  },
});

export default function App() {
  const [showBreak, setShowBreak] = useState(false);

  const [active, setActive] = useState(elements[0]);

  return (
    <SafeAreaView style={styles.container}>
      {elements.map(id => (
        <Elements
          key={id}
          id={id}
          active={active === id}
          setActive={() => setActive(id)}
          breaks={breaks}
          showBreak={showBreak}
          setShowBreak={setShowBreak}
        />
      ))}

      {breaks.map(breakVal => (
        <View
          key={breakVal}
          style={[
            styles.line,
            {
              left: breakVal,
              display: breakVal === showBreak ? "flex" : "none",
            },
          ]}
        />
      ))}
    </SafeAreaView>
  );
}

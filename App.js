import React, { useState } from "react";
import {
  Dimensions,
  Button,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import Elements from "./Elements";

const screenWidth = Math.round(Dimensions.get("window").width);

const getBreaks = howMany =>
  new Array(howMany)
    .fill(null)
    .map((_, idx) => (screenWidth / (howMany + 1)) * (idx + 1));

const breaks = getBreaks(8);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5FCFF",
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

// TODO. take positions of elements level up, so breaks can be created
// based on elements, not only document size

export default function App() {
  const [showBreak, setShowBreak] = useState(false);
  const [elements, setElements] = useState([]);
  const [showBreaks, setShowBreaks] = useState(false);
  const [active, setActive] = useState(elements[0]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        onStartShouldSetResponder={() => setActive(-1)}
        style={styles.container}
      >
        <Button
          title="+"
          onPress={() => setElements(a => a.concat([Math.random()]))}
        />

        <Button title="show grid" onPress={() => setShowBreaks(a => !a)} />

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
                display: showBreaks || breakVal === showBreak ? "flex" : "none",
              },
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

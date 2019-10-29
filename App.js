import React, { useState } from "react";
import {
  Dimensions,
  Button,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import Elements from "./Elements";
import { findIndex, propEq, reject, uniq } from "ramda";
import { ColorWheel } from "./ColorWheel";
import colorsys from "colorsys";

const Picker = ({ selected }) => (
  <ColorWheel
    initialColor="#ee0000"
    onColorChange={color => selected(colorsys.hsv2Hex(color))}
    onColorChangeComplete={color => selected(colorsys.hsv2Hex(color))}
    style={{ width: 200 }}
    thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
  />
);

const screenWidth = Math.round(Dimensions.get("window").width);

const getBreaks = howMany =>
  new Array(howMany)
    .fill(null)
    .map((_, idx) => (screenWidth / (howMany + 1)) * (idx + 1));

const breaks = getBreaks(8);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
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

  const [showBreaks, setShowBreaks] = useState(false);

  const [breaks, _setHorizontalBrakes] = useState(getBreaks(7));

  const [elements, setElements] = useState([]);
  const [active, setActive] = useState(elements[0]);

  const setHorizontalBrakes = (active = null) => {
    _setHorizontalBrakes(
      uniq(
        reject(propEq("key", active), elements)
          .map(({ position }) => position)
          .map(({ left, right }) => {
            left = parseInt(left);
            right = parseInt(right);

            const width = right - left;
            const center = left + width / 2;

            return [left, center, right];
          })
          .flat(),
      ),
    );
  };

  const setPosition = idx => handler =>
    setElements(elements => {
      elements[idx].position = handler(elements[idx].position);
      return [...elements];
    });

  const setColor = (key, color) =>
    setElements(elements => {
      const idx = findIndex(propEq("key", key), elements);
      if (elements[idx]) {
        elements[idx].color = color;
        return [...elements];
      }

      return elements;
    });

  return (
    <SafeAreaView style={styles.container}>
      <View
        onStartShouldSetResponder={() => setActive(-1)}
        style={styles.container}
      >
        <View
          style={{
            width: 300,
            height: 300,
            position: "absolute",
            zIndex: 5,
            bottom: 0,
          }}
        >
          <Picker selected={color => setColor(active, color)} />
        </View>

        <Button
          title="+"
          onPress={() =>
            setElements(a =>
              a.concat([
                {
                  key: Math.random(),
                  position: {
                    top: 30,
                    left: 30,
                    right: 80,
                    bottom: 80,
                  },
                },
              ]),
            )
          }
        />

        <Button title="show grid" onPress={() => setShowBreaks(a => !a)} />

        {elements.map(({ key, color, position }, idx) => (
          <Elements
            key={key}
            id={key}
            color={color || "skyblue"}
            setHorizontalBrakes={setHorizontalBrakes}
            /* horizontalBreaks={horizontalBreaks} */
            setPosition={setPosition(idx)}
            position={position}
            active={active === key}
            setActive={() => setActive(key)}
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

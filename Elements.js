import React, { useState } from "react";
import { View, StyleSheet, PanResponder } from "react-native";

const CIRCLE_RADIUS = 5;

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    backgroundColor: "skyblue",
    borderWidth: 0.5,
    borderStyle: "solid",
  },

  circle: {
    borderColor: "#477BE3",
    borderStyle: "solid",
    borderWidth: 1,

    backgroundColor: "#fff",

    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

const DefView = ({ active, setActive, breaks, setShowBreak }) => {
  const [position, setPosition] = useState({
    top: 30,
    left: 30,
    right: 80,
    bottom: 80,
  });

  const width = position.right - position.left;
  const height = position.bottom - position.top;

  const panResponderCorner = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, g) => {
      setPosition(s => ({
        ...s,
        right: parseInt(g.moveX),
        bottom: parseInt(g.moveY),
      }));
    },
  });

  const panResponderUpLeft = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, g) => {
      setPosition(s => ({
        ...s,
        left: parseInt(g.moveX),
        top: parseInt(g.moveY),
      }));
    },
  });

  const panResponderCenter = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, g) => {
      const left = g.moveX;
      const top = g.moveY;

      const onBreak = breaks.find(breakVal => Math.abs(left - breakVal) < 15);

      setShowBreak(onBreak);

      if (onBreak) {
        const left = onBreak;

        setPosition(() => ({
          left: parseInt(left - width / 2),
          right: parseInt(left + width / 2),
          top: parseInt(top - height / 2),
          bottom: parseInt(top + height / 2),
        }));
      } else {
        setPosition(() => ({
          left: parseInt(left - width / 2),
          right: parseInt(left + width / 2),
          top: parseInt(top - height / 2),
          bottom: parseInt(top + height / 2),
        }));
      }
    },
    onPanResponderRelease: () => {
      setShowBreak(false);
    },
  });

  return (
    <View
      onStartShouldSetResponder={setActive}
      style={[
        styles.box,
        {
          left: position.left,
          top: position.top,
          borderColor: active ? "#477BE3" : "transparent",
          width,
          height,
          zIndex: active ? 5 : 0,
          shadowColor: active ? "#333" : "transparent",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1,
        },
      ]}
    >
      {active && (
        <>
          <View
            {...panResponderUpLeft.panHandlers}
            style={[
              styles.circle,
              {
                position: "absolute",
                left: "0%",
                top: "0%",
                marginLeft: -3,
                marginTop: -3,
              },
            ]}
          />

          <View
            {...panResponderCorner.panHandlers}
            style={[
              styles.circle,
              {
                position: "absolute",
                left: "100%",
                top: "100%",
                marginLeft: -6,
                marginTop: -6,
              },
            ]}
          />

          <View
            {...panResponderCenter.panHandlers}
            style={[
              styles.circle,
              {
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -14,
                marginTop: -14,
                width: 30,
                height: 30,
              },
            ]}
          />
        </>
      )}
    </View>
  );
};

export default DefView;

// onPanResponderRelease: (e, gesture) => {
//   Animated.spring(pan, {
//     toValue: { x: 200, y: 0 },
//     friction: 5,
//   }).start();
// },
// onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
// onPanResponderGrant: () => {
//   // pan.setOffset({
//   //   x: _val.x,
//   //   y: _val.y,
//   // });
//   // pan.setValue({ x: 0, y: 0 });
// },

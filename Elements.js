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
      const right = g.moveX;
      const bottom = g.moveY;

      const onBreak = breaks.find(breakVal => Math.abs(right - breakVal) < 15);

      setShowBreak(onBreak);

      if (onBreak) {
        const right = onBreak;

        setPosition(s => ({
          ...s,
          right: parseInt(right),
          bottom: parseInt(bottom),
        }));
      } else {
        setPosition(s => ({
          ...s,
          right: parseInt(right),
          bottom: parseInt(bottom),
        }));
      }
    },
    onPanResponderRelease: () => setShowBreak(false),
  });

  const panResponderUpLeft = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, g) => {
      const left = g.moveX;
      const top = g.moveY;

      const onBreak = breaks.find(breakVal => Math.abs(left - breakVal) < 15);

      setShowBreak(onBreak);

      if (onBreak) {
        const left = onBreak;

        setPosition(s => ({
          ...s,
          left: parseInt(left),
          top: parseInt(top),
        }));
      } else {
        setPosition(s => ({
          ...s,
          left: parseInt(left),
          top: parseInt(top),
        }));
      }
    },
    onPanResponderRelease: () => setShowBreak(false),
  });

  const [leftIn, setLeftIn] = useState(0);

  const panResponderWhole = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, g) => {
      const left = g.moveX - leftIn;
      const right = left + width;
      const top = g.dy + position.top;
      const bottom = g.dy + position.bottom;

      const center = left + width / 2;

      const onBreakCenter = breaks.find(
        breakVal => Math.abs(center - breakVal) < 15
      );
      const onBreakLeft = breaks.find(
        breakVal => Math.abs(left - breakVal) < 15
      );

      const onBreak = Math.min([onBreakCenter, onBreakLeft].filter(a => a));

      setShowBreak(onBreak);

      if (onBreakCenter) {
        const left = onBreakCenter - width / 2;
        const right = left + width;

        setPosition({
          left,
          right,
          top,
          bottom,
        });

        return;
      } else if (onBreakLeft) {
        const left = onBreakLeft;
        const right = left + width;

        setPosition({
          left,
          right,
          top,
          bottom,
        });

        return;
      }

      setPosition({
        left,
        right,
        top,
        bottom,
      });
    },
    onPanResponderGrant: e => {
      setLeftIn(e.nativeEvent.locationX);
      setActive();
    },
    onPanResponderRelease: () => setShowBreak(false),
  });

  return (
    <View
      {...panResponderWhole.panHandlers}
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
          elevation: 12,
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

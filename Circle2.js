import React, { useState, useEffect } from "react";
import { View, StyleSheet, PanResponder, Animated } from "react-native";

const CIRCLE_RADIUS = 5;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "skyblue",
  },

  circle: {
    borderColor: "#333",
    borderStyle: "solid",
    borderWidth: 1,

    backgroundColor: "#fff",

    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

const DefView = () => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const [right, setRight] = useState(50);
  const [bottom, setBottom] = useState(50);

  const width = right - left;
  const height = bottom - top;

  const [wH, setWh] = useState({ w: width, h: height });

  const panResponderCorner = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, g) => {
      setRight(Math.max(g.moveX, 0));
      setBottom(Math.max(g.moveY, 0));
    },
    onPanResponderRelease: () => {
      setWh({ w: width, h: height });
    },
  });

  const panResponderUpLeft = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, g) => {
      setLeft(Math.max(g.moveX, 0));
      setTop(Math.max(g.moveY, 0));
    },
    onPanResponderRelease: () => {
      setWh({ w: width, h: height });
    },
  });

  const panResponderCenter = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, g) => {
      setLeft(Math.max(g.moveX - wH.w / 2, 0));
      setRight(Math.max(g.moveX + wH.w / 2, 0));

      setTop(Math.max(g.moveY - wH.h / 2, 0));
      setBottom(Math.max(g.moveY + wH.h / 2, 0));
    },
  });

  return (
    <>
      <View
        style={[
          styles.box,
          {
            position: "absolute",
            left,
            top,
            width,
            height,
          },
        ]}
      >
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
              marginLeft: -6,
              marginTop: -6,
            },
          ]}
        />
      </View>
    </>
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

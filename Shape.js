// @flow
import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  Surface,
  Shape,
  Group,
  Path,
  Transform,
  LinearGradient,
} from "@react-native-community/art";

export default function CustomShape() {
  const surfaceWidth = Dimensions.get("window").width;
  const surfaceHeight = surfaceWidth / 2;
  const gradient = new LinearGradient(
    {
      ".5": "blue",
      "1": "black",
    },
    0,
    0,
    250,
    250
  );

  const path = new Path()
    .line(40, 200)
    .line(150, 80)
    .line(150, -80)
    .line(40, -200)
    .line(-190, 120);

  return (
    <TouchableWithoutFeedback
      onPressIn={a => console.log("pressin", a.nativeEvent)}
      onPressOut={a => console.log("pressout", a.nativeEvent)}
    >
      <View>
        <Surface
          width={surfaceWidth}
          height={surfaceHeight}
          style={styles.surface}
        >
          <Group
            transform={new Transform().scale(0.5, 0.5)}
            x={surfaceWidth / 2 - 90}
            y={surfaceHeight / 2 - 70}
          >
            <Shape d={path} fill={gradient} />
          </Group>
        </Surface>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#d39494",
  },
});

import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class SvgExample extends React.Component {
  render() {
    return (
      <View
        style={[
          /* StyleSheet.absoluteFill, */
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Svg
          height="300"
          width="300"
          viewBox="0 0 100 100"
          onPress={a => console.log(a)}
        >
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"
          />

          <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg>
      </View>
    );
  }
}

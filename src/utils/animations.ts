import { Easing } from "react-native-reanimated";

export const animations = {
  spring: {
    damping: 15,
    stiffness: 150,
  },
  timing: {
    duration: 250,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
  quick: {
    duration: 150,
    easing: Easing.ease,
  },
};


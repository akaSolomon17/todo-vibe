import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

interface KeyboardDismissProps {
  children: ReactNode;
}

export function KeyboardDismiss({ children }: KeyboardDismissProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
}


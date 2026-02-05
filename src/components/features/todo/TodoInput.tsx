import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Keyboard, Pressable, TextInput } from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTodoStore } from "../../../features/todo/store/todoStore";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TodoInput() {
  const [text, setText] = useState("");
  const { addTodo } = useTodoStore();
  const scale = useSharedValue(1);
  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();

  const isDisabled = text.trim().length === 0;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const buttonOpacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isDisabled ? 0.4 : 1, { duration: 150 }),
  }));

  // Dynamic margin bottom based on keyboard state
  const containerStyle = useAnimatedStyle(() => ({
    marginBottom: interpolate(
      keyboardHeight.value,
      [0, 1],
      [0, 24], // mb-6 when closed, mb-2 when open
    ),
  }));

  const handleSubmit = () => {
    if (text.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      scale.value = withSpring(0.9, {}, () => {
        scale.value = withSpring(1);
      });
      addTodo(text);
      setText("");
      Keyboard.dismiss();
    }
  };

  return (
    <Animated.View
      style={containerStyle}
      className="flex-row items-center bg-dark-200/90 rounded-2xl p-2 border border-dark-100 shadow-lg"
    >
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="What needs to be done?"
        placeholderTextColor="#6b7280"
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        className="flex-1 text-white px-4 py-3"
      />
      <AnimatedPressable
        onPress={handleSubmit}
        disabled={isDisabled}
        style={[animatedStyle, buttonOpacityStyle]}
        className="w-12 h-12 rounded-xl items-center justify-center bg-accent-purple"
      >
        <Ionicons name="add" size={28} color="#fff" />
      </AnimatedPressable>
    </Animated.View>
  );
}


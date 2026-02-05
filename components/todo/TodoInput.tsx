import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTodoStore } from "../../store/todoStore";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TodoInput() {
  const [text, setText] = useState("");
  const { addTodo } = useTodoStore();
  const scale = useSharedValue(1);

  const isDisabled = text.trim().length === 0;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const buttonOpacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isDisabled ? 0.4 : 1, { duration: 150 }),
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
    <View className="flex-row items-center bg-dark-200/90 backdrop-blur-lg rounded-2xl p-2 border border-dark-100 shadow-lg">
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
    </View>
  );
}


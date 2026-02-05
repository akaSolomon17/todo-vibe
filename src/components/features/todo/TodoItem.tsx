import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTodoStore } from "../../../features/todo/store/todoStore";
import { Todo } from "../../../features/todo/types/todo.types";

interface TodoItemProps {
  todo: Todo;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    deleteTodo(todo.id);
  };

  return (
    <AnimatedPressable
      onPress={handleToggle}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      style={animatedStyle}
      className="flex-row items-center bg-dark-200 rounded-2xl p-4 mb-3 border border-dark-100"
    >
      {/* Checkbox */}
      <View
        className={`w-7 h-7 rounded-full border-2 items-center justify-center mr-4 ${
          todo.completed
            ? "bg-accent-purple border-accent-purple"
            : "border-gray-500"
        }`}
      >
        {todo.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>

      {/* Title */}
      <Text
        className={`flex-1 text-base ${
          todo.completed ? "text-gray-500 line-through" : "text-white"
        }`}
        numberOfLines={2}
      >
        {todo.title}
      </Text>

      {/* Delete Button */}
      <Pressable
        onPress={handleDelete}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        className="ml-3 p-2"
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </Pressable>
    </AnimatedPressable>
  );
}


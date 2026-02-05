import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function EmptyState() {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      className="flex-1 items-center justify-center py-20"
    >
      <View className="w-24 h-24 rounded-full bg-dark-200 items-center justify-center mb-6">
        <Ionicons
          name="checkmark-done-circle-outline"
          size={56}
          color="#a855f7"
        />
      </View>
      <Text className="text-white text-xl font-semibold mb-2">
        All caught up!
      </Text>
      <Text className="text-gray-400 text-base text-center px-8">
        Add a new task to get started on your productivity journey
      </Text>
    </Animated.View>
  );
}


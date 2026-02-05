import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { TodoInput, TodoList } from "../src/components/features/todo";
import { KeyboardDismiss } from "../src/components/layout";
import { useTodoStore } from "../src/features/todo/store/todoStore";
import { useConfetti } from "../src/hooks";

export default function Home() {
  const { todos } = useTodoStore();
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  const { confettiRef, showConfetti, setShowConfetti, dimensions } =
    useConfetti();
  const { height } = useReanimatedKeyboardAnimation();

  const animatedStyle = useAnimatedStyle(() => ({
    paddingBottom: Math.abs(height.value),
  }));

  return (
    <KeyboardDismiss>
      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="flex-1 bg-dark-400">
          <StatusBar style="light" />

          {/* Confetti Celebration */}
          {showConfetti && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: dimensions.screenHeight + 200,
                zIndex: 9999,
                elevation: 9999,
                pointerEvents: "none",
                overflow: "visible",
              }}
            >
              <ConfettiCannon
                ref={confettiRef}
                count={80}
                origin={{ x: dimensions.width / 2, y: -20 }}
                fadeOut
                fallSpeed={2500}
                explosionSpeed={400}
                colors={["#a855f7", "#ec4899", "#22d3ee", "#fbbf24", "#34d399"]}
                onAnimationEnd={() => setShowConfetti(false)}
              />
            </View>
          )}

          <Animated.View style={animatedStyle} className="flex-1">
            {/* Header */}
            <View className="px-6 pt-4 pb-6">
              <View className="flex-row items-center justify-between mb-2">
                <View>
                  <Text className="text-gray-400 text-sm">Welcome back 👋</Text>
                  <Text className="text-white text-3xl font-bold mt-1">
                    My Tasks
                  </Text>
                </View>
                <Link href="/settings" asChild>
                  <View className="w-12 h-12 bg-dark-200 rounded-full items-center justify-center">
                    <Ionicons
                      name="settings-outline"
                      size={24}
                      color="#9ca3af"
                    />
                  </View>
                </Link>
              </View>

              {/* Stats */}
              {totalCount > 0 && (
                <View className="flex-row items-center mt-4 bg-dark-200 rounded-2xl p-4">
                  <View className="flex-1">
                    <Text className="text-gray-400 text-xs uppercase tracking-wider">
                      Progress
                    </Text>
                    <Text className="text-white text-lg font-semibold mt-1">
                      {completedCount} of {totalCount} tasks
                    </Text>
                  </View>
                  <View className="w-16 h-16 rounded-full border-4 border-dark-100 items-center justify-center">
                    <Text className="text-accent-purple text-lg font-bold">
                      {totalCount > 0
                        ? Math.round((completedCount / totalCount) * 100)
                        : 0}
                      %
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Todo List */}
            <View className="flex-1 px-6">
              <TodoList />
            </View>

            {/* Input - No background so list shows through */}
            <View className="px-4">
              <TodoInput />
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </KeyboardDismiss>
  );
}


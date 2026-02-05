import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoStore } from "../src/features/todo/store/todoStore";

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  danger?: boolean;
}

function SettingsItem({
  icon,
  title,
  subtitle,
  onPress,
  danger,
}: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-dark-200 rounded-2xl p-4 mb-3"
    >
      <View
        className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${
          danger ? "bg-red-500/20" : "bg-dark-100"
        }`}
      >
        <Ionicons
          name={icon}
          size={22}
          color={danger ? "#ef4444" : "#a855f7"}
        />
      </View>
      <View className="flex-1">
        <Text
          className={`text-base font-medium ${danger ? "text-red-400" : "text-white"}`}
        >
          {title}
        </Text>
        {subtitle && (
          <Text className="text-gray-500 text-sm mt-0.5">{subtitle}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6b7280" />
    </Pressable>
  );
}

export default function Settings() {
  const { todos, clearAllTodos } = useTodoStore();
  const completedCount = todos.filter((t) => t.completed).length;

  const handleClearAll = () => {
    if (todos.length === 0) {
      Alert.alert("No tasks", "There are no tasks to clear.");
      return;
    }

    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            clearAllTodos();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-400">
      <StatusBar style="light" />

      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <View className="flex-row items-center mb-6">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-dark-200 rounded-full items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <Text className="text-white text-2xl font-bold">Settings</Text>
        </View>

        {/* Stats Card */}
        <View className="bg-dark-200 rounded-2xl p-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-400 text-sm">Total Tasks</Text>
              <Text className="text-white text-3xl font-bold mt-1">
                {todos.length}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-gray-400 text-sm">Completed</Text>
              <Text className="text-accent-purple text-3xl font-bold mt-1">
                {completedCount}
              </Text>
            </View>
          </View>
          <View className="h-2 bg-dark-100 rounded-full mt-4 overflow-hidden">
            <View
              className="h-full bg-accent-purple rounded-full"
              style={{
                width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%`,
              }}
            />
          </View>
        </View>
      </View>

      {/* Settings Options */}
      <View className="px-6">
        <Text className="text-gray-400 text-xs uppercase tracking-wider mb-3 ml-1">
          Data
        </Text>
        <SettingsItem
          icon="trash-outline"
          title="Clear All Tasks"
          subtitle="Delete all your todos"
          onPress={handleClearAll}
          danger
        />

        <Text className="text-gray-400 text-xs uppercase tracking-wider mb-3 ml-1 mt-6">
          About
        </Text>
        <SettingsItem
          icon="information-circle-outline"
          title="App Version"
          subtitle="1.0.0"
          onPress={() => {}}
        />
        <SettingsItem
          icon="logo-github"
          title="View Source"
          subtitle="Open source project"
          onPress={() => {}}
        />
      </View>

      {/* Footer */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <Text className="text-gray-600 text-sm">
          Made with 💜 using React Native
        </Text>
      </View>
    </SafeAreaView>
  );
}


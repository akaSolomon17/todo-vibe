import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps {
  children: ReactNode;
  className?: string;
}

export function Screen({
  children,
  className = "flex-1 bg-dark-400",
}: ScreenProps) {
  return (
    <SafeAreaView className={className}>
      <StatusBar style="light" />
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
}


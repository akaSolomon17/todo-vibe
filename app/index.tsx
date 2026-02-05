import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Welcome() {
  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-400">
      <StatusBar style="light" />

      <View className="flex-1 items-center justify-center px-8">
        {/* Mascot */}
        <Animated.View
          entering={FadeIn.duration(800).delay(200)}
          className="mb-8"
        >
          <Image
            source={require("../assets/images/mascot.png")}
            style={{ width: 280, height: 280 }}
            contentFit="contain"
          />
        </Animated.View>

        {/* Title */}
        <Animated.Text
          entering={FadeInUp.duration(600).delay(500)}
          className="text-white text-4xl font-bold text-center mb-3"
        >
          Stay Organized
        </Animated.Text>

        {/* Subtitle */}
        <Animated.Text
          entering={FadeInUp.duration(600).delay(700)}
          className="text-gray-400 text-lg text-center mb-12 leading-7"
        >
          Manage your tasks effortlessly and{"\n"}boost your productivity
        </Animated.Text>

        {/* Features */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(900)}
          className="w-full mb-12"
        >
          <FeatureItem emoji="✨" text="Beautiful & intuitive interface" />
          <FeatureItem emoji="⚡" text="Lightning fast & smooth" />
          <FeatureItem emoji="🎯" text="Focus on what matters" />
        </Animated.View>
      </View>

      {/* CTA Button */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(1100)}
        className="px-8 pb-8"
      >
        <AnimatedPressable
          onPress={handleGetStarted}
          className="bg-accent-purple py-5 rounded-2xl items-center shadow-lg"
          style={{
            shadowColor: "#a855f7",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
          }}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </AnimatedPressable>
      </Animated.View>
    </SafeAreaView>
  );
}

function FeatureItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <View className="flex-row items-center mb-4">
      <View className="w-10 h-10 bg-dark-200 rounded-xl items-center justify-center mr-4">
        <Text className="text-lg">{emoji}</Text>
      </View>
      <Text className="text-gray-300 text-base">{text}</Text>
    </View>
  );
}


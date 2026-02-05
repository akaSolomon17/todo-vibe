import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const { width, height: screenHeight } = Dimensions.get("window");

// Global flag to prevent confetti from firing multiple times
let hasConfettiFired = false;

export function useConfetti() {
  const confettiRef = useRef<ConfettiCannon>(null);
  const [showConfetti, setShowConfetti] = useState(!hasConfettiFired);
  const startedRef = useRef(false);

  useEffect(() => {
    if (showConfetti && !hasConfettiFired && !startedRef.current) {
      hasConfettiFired = true;
      startedRef.current = true;
      const timer = setTimeout(() => {
        confettiRef.current?.start();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return {
    confettiRef,
    showConfetti,
    setShowConfetti,
    dimensions: { width, screenHeight },
  };
}


import { Stack } from "expo-router/stack";
import { NativeWindStyleSheet } from "nativewind";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});

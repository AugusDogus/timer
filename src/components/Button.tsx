import { Pressable, PressableProps, Text } from "react-native";
import { cn } from "../util/cn";

export function Button({
  onPress,
  _className,
  children,
  disabled,
}: {
  onPress: () => void;
  _className?: string;
  children: string;
  disabled?: boolean;
}) {
  return (
    <Pressable
      className={cn("p-2 m-2 rounded-md bg-blue-500", _className)}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="font-semibold text-center text-white">{children}</Text>
    </Pressable>
  );
}

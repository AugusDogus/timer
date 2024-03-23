import { ReactNode, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

export function Accordion({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  return (
    <View className="border-b border-gray-200">
      <Pressable
        className="flex flex-row items-center justify-between p-4"
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text className="text-lg font-medium">{title}</Text>
        {isOpen ? (
          <ChevronUp size={20} className="text-slate-600" />
        ) : (
          <ChevronDown size={20} className="text-slate-600" />
        )}
      </Pressable>
      {isOpen && <View className="px-4 pb-4">{children}</View>}
    </View>
  );
}

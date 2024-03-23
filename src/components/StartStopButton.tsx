import { Pressable, Text } from "react-native";
import { Timer } from "react-use-precision-timer";

export function StartStopButton({
  timer,
  setCurrentSplitIndex,
  splits,
  setSplits,
}: {
  timer: Timer;
  setCurrentSplitIndex: (index: number) => void;
  splits: Array<Array<number>>;
  setSplits: (splits: Array<Array<number>>) => void;
}) {
  const onPress = () => {
    if (timer.isRunning()) {
      timer.stop();
      setCurrentSplitIndex(splits.length);
    } else {
      timer.start();
      setSplits([...splits, []]);
    }
  };

  return (
    <Pressable className="p-2 bg-blue-500" onPress={onPress}>
      <Text className="font-semibold text-center text-white">
        {timer.isRunning() ? "Stop" : "Start"}
      </Text>
    </Pressable>
  );
}

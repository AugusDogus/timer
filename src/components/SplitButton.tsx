import type { Timer } from "react-use-precision-timer";
import { Button } from "./Button";

export function SplitButton({
  timer,
  isRunning,
  splits,
  setSplits,
  currentSplitIndex,
}: {
  timer: Timer;
  isRunning: boolean;
  splits: Array<Array<number>>;
  setSplits: (splits: Array<Array<number>>) => void;
  currentSplitIndex: number;
}) {
  const onPress = () => {
    if (isRunning) {
      // Make a shallow copy of splits
      const newSplits = [...splits];
      // Ensure the current split index is valid and adjust if necessary
      if (currentSplitIndex >= newSplits.length) {
        newSplits.push([]);
      }
      // Add the new split time to the correct array
      newSplits[currentSplitIndex].push(timer.getElapsedRunningTime());
      // Update the state
      setSplits(newSplits);
    }
  };

  return (
    <Button _className="bg-green-500" onPress={onPress}>
      Split
    </Button>
  );
}

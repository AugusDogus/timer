import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { Timer, TimerRenderer, useStopwatch } from "react-use-precision-timer";
import { useState } from "react";
import { Accordion } from "../components/Accordion"; // Assuming these components exist
import { StartStopButton } from "../components/StartStopButton";
import { SplitButton } from "../components/SplitButton";

export default function App() {
  const stopwatch = useStopwatch();
  const [splits, setSplits] = useState<Array<Array<number>>>([]);
  const [currentSplitIndex, setCurrentSplitIndex] = useState<number>(0); // New state variable

  return (
    <View>
      <TimerRenderer timer={stopwatch} />
      <StartStopButton
        timer={stopwatch}
        setCurrentSplitIndex={setCurrentSplitIndex}
        splits={splits}
        setSplits={setSplits}
      />
      <SplitButton
        timer={stopwatch}
        isRunning={stopwatch.isRunning()}
        splits={splits}
        setSplits={setSplits}
        currentSplitIndex={currentSplitIndex}
      />
      {splits.map((splitArray, index) => (
        <Accordion
          key={index}
          title={`Splits #${index + 1}`}
          defaultOpen={index === currentSplitIndex}
        >
          {splitArray.map((split, index) => (
            <Text key={`Split #${index + 1}`}>{split}</Text>
          ))}
        </Accordion>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

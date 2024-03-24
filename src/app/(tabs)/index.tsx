import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStopwatch } from "react-use-precision-timer";
import { useEffect, useState } from "react";
import { Accordion } from "../../components/Accordion"; // Assuming these components exist
import { StartStopButton } from "../../components/StartStopButton";
import { SplitButton } from "../../components/SplitButton";
import { TimerRenderer } from "../../components/TimeRenderer";
import { formatTime } from "~/util/formatTime";
import { RecordingStatus } from "expo-av/build/Audio";

export default function App() {
  const stopwatch = useStopwatch();
  const [split, setSplit] = useState<RecordingStatus>();
  const [splits, setSplits] = useState<Array<Array<number>>>([]);
  const [currentSplitIndex, setCurrentSplitIndex] = useState<number>(0);

  useEffect(() => {
    if (!split) return;
    const newSplits = [...splits];
    // Ensure the current split index is valid and adjust if necessary
    if (currentSplitIndex >= newSplits.length) {
      newSplits.push([]);
    }
    // Add the new split time to the correct array
    newSplits[currentSplitIndex].push(stopwatch.getElapsedRunningTime());
    // Update the state
    setSplits(newSplits);
  }, [split]);

  return (
    <SafeAreaView>
      <TimerRenderer timer={stopwatch} />
      <View className="mt-2">
        <StartStopButton
          timer={stopwatch}
          setSplit={setSplit}
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
      </View>

      <ScrollView>
        {splits.map((splitArray, index) => (
          <Accordion
            key={index}
            title={`Splits #${index + 1}`}
            defaultOpen={index === currentSplitIndex}
          >
            {splitArray.map((split, index) => (
              <Text key={`Split #${index + 1}`}>{formatTime(split)}</Text>
            ))}
          </Accordion>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { Timer } from "react-use-precision-timer";
import { Button } from "./Button";
import { useAtom } from "jotai";
import { backgroundLevelAtom, shotLevelAtom } from "../atoms";
import { RecordingStatus } from "expo-av/build/Audio";

export function StartStopButton({
  timer,
  setCurrentSplitIndex,
  setSplit,
  splits,
  setSplits,
}: {
  timer: Timer;
  setCurrentSplitIndex: (index: number) => void;
  setSplit: (split: RecordingStatus) => void;
  splits: Array<Array<number>>;
  setSplits: (splits: Array<Array<number>>) => void;
}) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [backgroundLevel] = useAtom(backgroundLevelAtom);
  const [shotLevel] = useAtom(shotLevelAtom);

  const isWithinTen = (a: number, b: number) => Math.abs(a - b) <= 10;

  async function startRecording() {
    setRecording(null);

    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.LowQualityMonoAudio,
      (status) => {
        // Check the difference between the current level and the background level
        const difference = backgroundLevel - shotLevel;
        // If the current level is greater than the background level and the difference between the current level and the background level is within a certain threshold, add the current level to the current split
        if (
          status?.metering &&
          status.metering > backgroundLevel &&
          isWithinTen(difference, status.metering)
        ) {
          setSplit(status);
        }
      },
      30
    );
    setRecording(recording);
  }

  const stopRecording = async () => {
    try {
      await recording?.stopAndUnloadAsync();
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const onPress = () => {
    if (timer.isRunning()) {
      timer.stop();
      setCurrentSplitIndex(splits.length);
      void stopRecording();
    } else {
      timer.start();
      setSplits([...splits, []]);
      void startRecording();
    }
  };

  return (
    <Button onPress={onPress}>{timer.isRunning() ? "Stop" : "Start"}</Button>
  );
}

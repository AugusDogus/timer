import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { backgroundLevelAtom, shotLevelAtom } from "../../atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Audio } from "expo-av";

export default function Settings() {
  const [backgroundLevel, setBackgroundLevel] = useAtom(backgroundLevelAtom);
  const [shotLevel, setShotLevel] = useAtom(shotLevelAtom);
  const [levels, setLevels] = useState<number[]>([]);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingMeasurement, setRecordingMeasurement] = useState<string>();

  async function startRecording() {
    setRecording(null);
    setLevels([]);
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.LowQualityMonoAudio,
      (status) => {
        if (status.isRecording) {
          setLevels((levels) => [...levels, Number(status.metering)]);
        }
      },
      30
    );
    setRecording(recording);
  }

  const stopRecording = async (set: typeof setBackgroundLevel) => {
    // Stop recording
    await recording?.stopAndUnloadAsync();
    setRecording(null);

    // Calculate peak level
    const peak = levels
      .filter((level) => level > -160)
      .reduce((acc, val) => Math.max(acc, val));

    // Set level
    set(peak);
  };

  return (
    <SafeAreaView className="h-full rounded-lg shadow-md">
      <Text className="px-4 pt-2 text-xl font-semibold text-center text-gray-700">
        Settings
      </Text>
      <View className="px-4 py-2">
        <View className="flex flex-row items-center py-1">
          <Text className="flex-1 text-lg text-gray-600">
            Background Level:{" "}
            <Text className="text-gray-800">{backgroundLevel}</Text>
          </Text>
          <Button
            _className="items-center justify-center px-4 py-2 ml-2"
            disabled={recordingMeasurement === "shot"}
            onPress={
              recording && recordingMeasurement === "background"
                ? () => {
                    stopRecording(setBackgroundLevel);
                    setRecordingMeasurement(undefined);
                  }
                : () => {
                    startRecording();
                    setRecordingMeasurement("background");
                  }
            }
          >
            {recordingMeasurement === "background" ? "Stop" : "Calibrate"}
          </Button>
        </View>
        <View className="flex flex-row items-center py-1">
          <Text className="flex-1 text-lg text-gray-600">
            Shot Level: <Text className="text-gray-800">{shotLevel}</Text>
          </Text>
          <Button
            _className="items-center justify-center px-4 py-2 ml-2"
            disabled={recordingMeasurement === "background"}
            onPress={
              recording && recordingMeasurement === "shot"
                ? () => {
                    stopRecording(setShotLevel);
                    setRecordingMeasurement(undefined);
                  }
                : () => {
                    startRecording();
                    setRecordingMeasurement("shot");
                  }
            }
          >
            {recording && recordingMeasurement === "shot"
              ? "Stop"
              : "Calibrate"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

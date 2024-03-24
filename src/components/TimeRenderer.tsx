import React from "react";
import type { Timer } from "react-use-precision-timer";
import { Subs } from "react-sub-unsub";
import { Text } from "react-native";
import { formatTime } from "~/util/formatTime";

export interface TimerRendererProps {
  /** The timer or stopwatch to render. */
  timer: Timer;
  /**
   * Renders the timer, returning a JSX element.
   * @param timer The timer to render.
   */
  render?: (timer: Timer) => JSX.Element;
  /** Render rate in milliseconds. */
  renderRate?: number;
}

/**
 * Renders a timer or stopwatch at regular intervals.
 */
export const TimerRenderer = ({
  timer,
  render = (timer) => (
    <Text className="text-3xl text-center">
      {formatTime(timer.getElapsedRunningTime())}
    </Text>
  ),
  renderRate = 10,
}: TimerRendererProps) => {
  const [, setRenderTime] = React.useState(Date.now());
  React.useEffect(() => {
    const subs = new Subs();
    subs.setInterval(() => setRenderTime(new Date().getTime()), renderRate);
    return subs.createCleanup();
  }, [renderRate]);
  return render(timer);
};

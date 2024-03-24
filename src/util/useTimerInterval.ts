import { useEffect, useState } from "react";
import type { Timer } from "react-use-precision-timer";

/**
 * Custom hook that executes a function at a specified interval.
 *
 * @param timer - The timer instance to be used.
 * @param execute - The function to be executed at each interval.
 * @param renderRate - The interval rate in milliseconds at which the function should be executed.
 */
export const useIntervalExecutor = (
  timer: Timer,
  execute: (timer: Timer) => void,
  renderRate: number = 1000
): void => {
  const [, setTicker] = useState(0); // This state is used to trigger the effect periodically.

  useEffect(() => {
    // This function sets an interval that updates the state, triggering re-renders at the specified rate.
    const intervalId = setInterval(() => {
      execute(timer); // Execute the passed function with the current timer.
      setTicker((ticker) => ticker + 1); // Update state to trigger re-render.
    }, renderRate);

    // Return a cleanup function that clears the interval when the component unmounts or dependencies change.
    return () => clearInterval(intervalId);
  }, [timer, execute, renderRate]); // Dependencies array: effect will re-run if any of these values change.
};

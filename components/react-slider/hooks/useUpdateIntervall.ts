import React from "react";

export interface PropsUseUpdateIntervall {
  updateState: () => void;
  stateUpdateIntervall?: number;
}

export const useUpdateIntervall = ({
  updateState,
  stateUpdateIntervall,
}: PropsUseUpdateIntervall) => {
  const stateUpdateRef = React.useRef<number | undefined>();

  // EVERY X SECONDS UPDATE THE this.state
  // ONLY THEN WILL THE SLIDER COMPONENT BE RERENDERED EXTERNALLY
  const startIntervall = React.useCallback(() => {
    stateUpdateRef.current = window.setInterval(() => {
      updateState();
    }, stateUpdateIntervall);
  }, [stateUpdateIntervall, updateState]);

  // ON MOUNT - START THE TIMER
  // ON UNMOUNT - REMOVE TIMER
  React.useEffect(() => {
    if (stateUpdateRef.current) return;
    startIntervall();
    return () => {
      window.clearInterval(stateUpdateRef.current);
      stateUpdateRef.current = undefined;
    };
  }, [startIntervall]);

  return { stateUpdateRef, startIntervall };
};

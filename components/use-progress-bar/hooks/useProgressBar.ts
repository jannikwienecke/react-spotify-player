import React from "react";
import { ProgressBarProps } from "../types";

export let widthPointerElement = 15;

export const useProgressBar = ({
  handleChange,
  onEnd,
  play,
  currentMs,
  mediaId,
  totalMs,
}: ProgressBarProps) => {
  const [positionPointer, setPositionPointer] = React.useState(0);
  const [isHoveringProgressBar, setIsHoveringProgressBar] = React.useState(
    false
  );
  const [playbackProgress, setPlaybackProgress] = React.useState(
    currentMs / totalMs
  );

  const pointerRef = React.useRef<HTMLDivElement>(null);
  const intervallRef = React.useRef<Number | undefined>();
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const startProgressBar = progressBarRef.current?.getBoundingClientRect().left;

  const _handlePositionChange = (eventXValue: number) => {
    if (startProgressBar === undefined) return;
    const newXValue = eventXValue - startProgressBar;

    const newDisplayPosition = getNewDisplayPositionPointer(newXValue);
    const newMsPosition = getPositionMs(newDisplayPosition);
    setPlaybackProgress(newMsPosition / totalMs);
    clearAllIntervalls();

    if (!handleChange) {
      console.warn("Please Provide a handleChange Function");
    }

    // RUN USER FUNCTION
    handleChange(newMsPosition)
      .then((ms) => {
        setPlaybackProgress(ms / totalMs);
        startIntervall();
      })
      .catch((error) => {
        console.log("error in Slider", error);
        setPlaybackProgress(0);
        setPositionPointer(0);
        clearAllIntervalls();
      });
  };

  const handleClickProgressBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isDragging.current) return;
    clearAllIntervalls();
    _handlePositionChange(event.pageX);
  };

  const handleHoverProgressBar = () => {
    setIsHoveringProgressBar(true);
  };

  const handleMouseLeave = () => {
    if (isDragging.current) return;
    setIsHoveringProgressBar(false);
  };

  const handleDragStart = () => {
    isDragging.current = true;

    clearAllIntervalls();
  };

  const handleDragging = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const eventXValue = event.pageX;

    isDragging.current = true;
    clearAllIntervalls();

    if (startProgressBar === undefined) return;

    const newXValue = eventXValue - startProgressBar;

    const newDisplayPosition = getNewDisplayPositionPointer(newXValue);
    const newMsPosition = getPositionMs(newDisplayPosition);

    // WHEN DRAGGING ONLY UPDATE THE POINTER
    // OTHERWISE POINTER JUMPS BACk AND FORTH
    setPositionPointer((newMsPosition / totalMs) * getWidthProgressBar());
  };

  const handleDragEnd = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHoveringProgressBar(false);
    isDragging.current = false;

    _handlePositionChange(event.pageX);
  };

  const startIntervall = React.useCallback(() => {
    if (!play) return;

    intervallRef.current = window.setInterval(() => {
      setPlaybackProgress((position: number) => {
        return position + 1 / totalMs;
      });
    }, 100);
  }, [totalMs, play]);

  React.useEffect(() => {
    if (playbackProgress) {
      if (playbackProgress.toFixed(2) === "1.00") {
        clearAllIntervalls();
        // USER FUNCTION
        onEnd();
      } else setPositionPointer(playbackProgress * getWidthProgressBar());
    }
  }, [playbackProgress, onEnd]);

  React.useEffect(() => {
    startIntervall();
  }, [startIntervall]);

  React.useEffect(() => {
    currentMs && startIntervall();
  }, [currentMs, startIntervall]);

  React.useEffect(() => {
    setPlaybackProgress(0);
    clearAllIntervalls();
    startIntervall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaId]);

  React.useEffect(() => {
    if (!play) {
      clearAllIntervalls();
    } else {
      startIntervall();
    }
  }, [play, startIntervall]);

  const getWidthProgressBar = () => {
    if (!progressBarRef.current) return 0;
    return progressBarRef.current.getBoundingClientRect().width;
  };

  const getCurrentPositionPointer = () => {
    if (!pointerRef.current) return 0;
    return pointerRef.current?.getBoundingClientRect().x;
  };

  const getPositionMs = (positionDisplay: number) => {
    const widthProgressBar = getWidthProgressBar();

    const relativDisplayPosition = positionDisplay / widthProgressBar;
    const positionMs = totalMs * relativDisplayPosition;

    return positionMs;
  };

  const getNewDisplayPositionPointer = (eventXValue: number) => {
    return eventXValue - widthPointerElement / 2;
  };

  const clearAllIntervalls = () => {
    for (var i = 1; i < 999; i++) clearInterval(i);
  };

  return {
    handleClickProgressBar,
    handleDragStart,
    handleDragEnd,
    handleDragging,
    handleHoverProgressBar,
    handleMouseLeave,
    getCurrentPositionPointer,
    getWidthProgressBar,
    playbackProgress,
    pointerRef,
    progressBarRef,
    isHoveringProgressBar,
    positionPointer,
  };
};

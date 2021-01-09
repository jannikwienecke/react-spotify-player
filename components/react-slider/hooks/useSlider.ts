import React from "react";

export const useSlider = (onChangeCallBack: (ms: number) => void) => {
  const [play, setPlay] = React.useState(false);
  const [currentMs, setCurrentMs] = React.useState(0);
  const [media, setMedia] = React.useState({ mediaId: 1, totalMs: 200000 });

  const onChange = React.useCallback(async (ms: number) => {
    try {
      await onChangeCallBack(ms);
      return ms;
    } catch (error) {
      return Promise.reject("ERROR");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    play,
    setPlay,
    currentMs,
    setCurrentMs,
    setMedia,
    media,
    onChange,
  };
};

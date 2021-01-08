import React from "react";
import { PropsStyleSliderProgress } from "../types";
import "./Slider.css";

interface ProgressBarSiderContainerProps {
  hover: boolean;
  progress: number;
  stylesSliderProgress?: PropsStyleSliderProgress;
}

/**
 *
 * This Component displays the progress of the song when hovering on the Progress bar
 * Progress is the value of the current milliseconds of the song / total milliseconds of the song
 */
export const ProgressBarSideContainer: React.FC<ProgressBarSiderContainerProps> = ({
  hover,
  children,
  progress,
  stylesSliderProgress,
}) => {
  const hoverStyles = hover
    ? {
        backgroundColor:
          stylesSliderProgress?.backgroundColorOnHover || "rgba(16, 185, 129",
      }
    : {};

  const styles = {
    ...{
      cursor: "pointer",
      width: `${progress * 100 + 0.5}%`,
      height: "100%",
      backgroundColor: "#ccc",
    },
    ...stylesSliderProgress,
    ...hoverStyles,
  };

  return (
    <div className="slider-progress" style={{ ...styles }}>
      {children}
    </div>
  );
};

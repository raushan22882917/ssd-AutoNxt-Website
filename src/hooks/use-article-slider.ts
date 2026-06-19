import { useState, useEffect } from "react";

export function useArticleSlider(itemsLength: number, isPaused = false) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when items length changes (e.g. search or filter changes the list)
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsLength]);

  // Set up auto-sliding interval (4 seconds)
  useEffect(() => {
    if (itemsLength <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemsLength);
    }, 4000);
    return () => clearInterval(timer);
  }, [itemsLength, currentIndex, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % itemsLength);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
  };

  return {
    currentIndex,
    setCurrentIndex,
    handleNext,
    handlePrev,
  };
}

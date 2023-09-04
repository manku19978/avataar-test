import { useState, useEffect } from "react";
import Main from "./Main/Main";

const CarouselWrapper = ({
  slides,
  height,
  width,
  margin,
  offset,
  controls,
  keyControls,
}) => {
  const [offsetRadius, setOffsetRadius] = useState(offset);
  const [showArrows, setShowArrows] = useState(controls);
  const [goToSlide, setGoToSlide] = useState(null);

  const table = slides.map((element, index) => {
    return {
      ...element,
      onClick: () => {
        setGoToSlide(index);
      },
    };
  });

  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(offset);
    setShowArrows(showArrows);
  }, [offset, showArrows]);

  return (
    <div style={{ width, height, margin }}>
      <Main
        slides={cards}
        goToSlide={goToSlide}
        setGoToSlide={setGoToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        keyControls={keyControls}
        animationConfig={{
          tension: 120,
          friction: 14,
        }}
      />
    </div>
  );
};

export default CarouselWrapper;

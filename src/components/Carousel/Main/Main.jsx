import { useState, useEffect, useRef } from "react";
import s from "./Main.module.css";
import cn from "classnames";
import MainSlide from "../MainSlide/MainSlide";
import { ArrowLeft, ArrowRight } from "../../../icons";

const DEFAULT_GO_TO_SLIDE_DELAY = 200;

const mod = (a, b) => {
  return ((a % b) + b) % b;
};

const Main = ({
  slides,
  goToSlide,
  offsetRadius,
  showNavigation,
  animationConfig,
  setGoToSlide,
  keyControls,
}) => {
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const goToIn = useRef(null);
  const [index, setIndex] = useState(0);
  const [prevPropsGoToSlide, setPrevPropsGoToSlide] = useState(0);
  const [newSlide, setNewSlide] = useState(false);

  const modBySlidesLength = (index) => {
    return mod(index, slides.length);
  };

  const moveSlide = (direction) => {
    setIndex(modBySlidesLength(index + direction));
    setGoToSlide(null);
  };

  const getShortestDirection = (from, to) => {
    if (from > to) {
      if (from - to > slides.length - 1 - from + to) {
        return 1;
      } else return -1;
    } else if (to > from) {
      if (to - from > from + slides.length - 1 - to) {
        return -1;
      } else return 1;
    }
    return 0;
  };

  const clampOffsetRadius = (offsetRadius) => {
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }

    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  };

  const getPresentableSlides = () => {
    const tempOffsetRadius = clampOffsetRadius(offsetRadius);
    const presentableSlides = new Array();

    for (let i = -tempOffsetRadius; i < 1 + tempOffsetRadius; i++) {
      presentableSlides.push(slides[modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  };

  useEffect(() => {
    const handleGoToSlide = () => {
      const updatedSlide = mod(goToSlide, slides.length);

      if (updatedSlide !== index) {
        let direction = getShortestDirection(index, updatedSlide);
        const isFinished =
          modBySlidesLength(index + direction) === updatedSlide;

        setIndex(modBySlidesLength(index + direction));
        setNewSlide(isFinished);

        const tempGoToSlide = isFinished ? null : updatedSlide;
        setGoToSlide(tempGoToSlide);
      }
    };

    if (typeof goToSlide === "number") {
      if (newSlide) {
        handleGoToSlide();
      } else if (index !== goToSlide && window) {
        clearTimeout(goToIn.current);
        goToIn.current = window.setTimeout(
          handleGoToSlide,
          DEFAULT_GO_TO_SLIDE_DELAY
        );
      } else if (window) {
        window.clearTimeout(goToIn.current);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        clearTimeout(goToIn.current);
      }
    };
  }, [goToSlide, index, newSlide]);

  useEffect(() => {
    if (goToSlide !== prevPropsGoToSlide) {
      setPrevPropsGoToSlide(goToSlide);
      setGoToSlide(goToSlide);
      setNewSlide(true);
    }
  }, [goToSlide, prevPropsGoToSlide, setGoToSlide]);

  useEffect(() => {
    const move = (e) => {
      if (e.key === "ArrowLeft" && leftArrow.current) {
        leftArrow.current.click();
      }

      if (e.key === "ArrowRight" && rightArrow.current) {
        rightArrow.current.click();
      }
    };

    window.addEventListener("keydown", move);

    return () => {
      window.removeEventListener("keydown", move);
    };
  }, []);

  const dots = slides.map((slide, i) => (
    <div
      className={cn(s.dot, { [s.active]: i === index })}
      key={slide.key}
    ></div>
  ));

  return (
    <>
      <div className={cn(s.wrapper)}>
        {getPresentableSlides().map((slide, presentableIndex) => (
          <MainSlide
            key={slide.key}
            content={slide.content}
            onClick={slide.onClick}
            offsetRadius={clampOffsetRadius(offsetRadius)}
            index={presentableIndex}
            animationConfig={animationConfig}
          />
        ))}
      </div>

      <div className={cn(s.navContainer, "flex", "ac", "jc")}>
        <div
          onClick={() => moveSlide(-1)}
          className={cn(s.arrow)}
          ref={leftArrow}
        >
          <ArrowLeft />
        </div>

        {dots}

        <div
          onClick={() => moveSlide(1)}
          className={cn(s.arrow)}
          ref={rightArrow}
        >
          <ArrowRight />
        </div>
      </div>
    </>
  );
};

export default Main;

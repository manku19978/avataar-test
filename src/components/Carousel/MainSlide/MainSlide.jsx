import s from "./MainSlide.module.css";
import cn from "classnames";
import { Spring } from "react-spring/renderprops";

const getDefaultTranslateX = (offsetFromCenter, offsetRadius, index) => {
  const totalPresentables = 2 * offsetRadius + 1;
  const translateXoffset =
    50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
  let translateX = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter > 0) {
    translateX += translateXoffset;
  } else if (offsetFromCenter < 0) {
    translateX -= translateXoffset;
  }
  return translateX;
};

const MainSlide = ({
  content,
  offsetRadius,
  index,
  animationConfig,
  onClick,
}) => {
  const offsetFromCenter = index - offsetRadius;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));

  const styles = () => {
    const translateX = getDefaultTranslateX(
      offsetFromCenter,
      offsetRadius,
      index
    );

    return {
      transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
      left: `${
        offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
      }%`,
      opacity: distanceFactor * distanceFactor,
    };
  };

  return (
    <Spring to={styles()} config={animationConfig}>
      {(style) => (
        <div
          className={cn(s.sliderContainer)}
          style={{
            ...style,
            zIndex: Math.abs(Math.abs(offsetFromCenter) - offsetRadius),
          }}
          onClick={onClick}
        >
          {content}
        </div>
      )}
    </Spring>
  );
};

export default MainSlide;

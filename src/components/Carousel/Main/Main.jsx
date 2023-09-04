import s from './Main.module.css';
import cn from 'classnames';
import Carousel from 'react-spring-3d-carousel';

const Main = ({ slides, goToSlide, offsetRadius, showNavigation, animationConfig }) => {
  return (
    <div>
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showNavigation}
        animationConfig={animationConfig}
      />
    </div>
  );
};

export default Main;

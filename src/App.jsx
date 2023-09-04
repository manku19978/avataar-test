// import s from './App.module.css';
import cn from "classnames";
import Navbar from "./components/Navbar/Navbar";
import CarouselWrapper from "./components/Carousel/CarouselWrapper";
import { v4 as uuidv4 } from "uuid";
import Slide from "./components/Carousel/Slide/Slide";

const slides = [
  {
    key: uuidv4(),
    content: <Slide label="1" />,
  },
  {
    key: uuidv4(),
    content: <Slide label="2" />,
  },
  {
    key: uuidv4(),
    content: <Slide label="3" />,
  },
  {
    key: uuidv4(),
    content: <Slide label="4" />,
  },
  {
    key: uuidv4(),
    content: <Slide label="5" />,
  },
  {
    key: uuidv4(),
    content: <Slide label="6" />,
  },
  {
    key: uuidv4(),
    content: <Slide label="7" />,
  },
  {
    key: uuidv4(),
    content: <Slide label="8" />,
  },
];

function App() {
  return (
    <div>
      <Navbar />

      <div className={cn("flex", "jc")}>
        <CarouselWrapper
          slides={slides}
          height="532px"
          width="70%"
          margin="100px auto"
          offset={5}
          controls={true}
          keyControls={true}
        />
      </div>
    </div>
  );
}

export default App;

import s from './Slide.module.css';
import cn from 'classnames';

const Slide = ({ label }) => {
  return <div className={cn(s.container, 'flex', 'jc', 'ac')}>{label}</div>;
};

export default Slide;

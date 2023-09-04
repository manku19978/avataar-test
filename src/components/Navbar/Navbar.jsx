import s from './Navbar.module.css';
import cn from 'classnames';
import { Logo, SearchIcon, ArrowDown } from '../../icons';
import { useState } from 'react';
import d from '../../shared/dictionary';

const Navbar = () => {
  const [navItems, setNavItems] = useState(d.EN.NAVBAR.NAVLIST_INITIAL);
  const [moreItems, setMoreItems] = useState(d.EN.NAVBAR.MORE_NAV_ITEMS);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const toggleMore = () => setIsMoreOpen((prev) => !prev);

  const navList = navItems.map((item) => (
    <a className={cn(s.navItem)} key={item}>
      {item}
    </a>
  ));

  const moreList = moreItems.map((item) => (
    <div key={item} className={cn(s.moreItem)}>
      {item}
    </div>
  ));

  return (
    <div className={cn(s.wrapper, 'flex', 'ac', 'jc')}>
      <div className={cn(s.container, 'flex', 'ac')}>
        <div className={cn(s.logo)}>
          <Logo />
        </div>

        <div className={cn(s.navList, 'flex')}>
          {navList}

          <div className={cn(s.moreBtn, s.navItem, 'flex', 'ac')} onClick={toggleMore}>
            <span>{d.EN.NAVBAR.MORE_BTN}</span>
            <ArrowDown />

            {isMoreOpen && <div className={cn(s.moredd)}>{moreList}</div>}
          </div>
        </div>

        <div className={cn(s.inputContainer, 'flex', 'ac')}>
          <SearchIcon />
          <input className={cn(s.input)} type="text" placeholder={d.EN.NAVBAR.INPUT.PLACEHOLDER} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

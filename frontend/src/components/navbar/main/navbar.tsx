import style from './navbar.module.css';
import Logo from '../../../assets/logo.png';
import Icon from '../../../utils/getIcon';
import useTheme from '../../../hooks/useTheme';
import ThemeWindow from '../themeSwitchWindow/themeWindow';
import { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {

  const { theme, setTheme } = useTheme();

  const themeSwitchWindowRef = useRef(null);

  const handleThemeChange = (themePref: "dark" | "light" | "system") => {
    setTheme(themePref);
  };

  const [isThemeWindowOpen, setIsThemeWindowOpen] = useState(false);

  const toggleThemeWindow = () => {
    setIsThemeWindowOpen(!isThemeWindowOpen);
  };

  const navLinkClass = (isActive: boolean) => {
    return `${style.navLinks} ${isActive ? style.activeLink : ''}`;
  };

  return (
    <>
        <nav className={style.navContainer}>
          <div className={style.navbarContent}>
            <a>
              <img src={Logo} alt="App Logo that redirects href home on click" className={style.logo} />
            </a>

          <div className={style.navLinksContainer}>
            <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
              Home
            </NavLink>

            <NavLink to="/items" className={({ isActive }) => navLinkClass(isActive)}>
              Items
            </NavLink>

            <NavLink to="/postfounditem" className={({ isActive }) => navLinkClass(isActive)}>
              Post Found Item
            </NavLink>

            <NavLink to="/lookforitem" className={({ isActive }) => navLinkClass(isActive)}>
              Report Lost Item
            </NavLink>

            <NavLink to="/help" className={({ isActive }) => navLinkClass(isActive)}>
              Help
            </NavLink>
          </div>

            <div className={style.navActions}>
              <button className={style.searchButton}>
                <Icon name="search" className={style.searchIcon}/>
              </button>
              <button className={style.themeToggle} onClick={toggleThemeWindow}>
                {theme === "dark" ? <Icon name="moon" className={style.moon}/> 
                : theme === "light" ? <Icon name="sun" className={style.themeIcon}/> 
                :<Icon name="sunmoon" className={style.themeIcon}/>
                }
              </button>
              <button className={style.signup}>Sign In</button>
            </div>
          </div>
          {isThemeWindowOpen && ( <ThemeWindow handleThemeChange={handleThemeChange} theme={theme} ref={themeSwitchWindowRef}  onClickOutside={() => setIsThemeWindowOpen(false)} /> )}
        </nav>
    </>
  );
};

export default Navbar;
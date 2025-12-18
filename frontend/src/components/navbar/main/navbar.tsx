import style from './navbar.module.css';
import Logo from '../../../assets/logo.png';
import Icon from '../../../utils/getIcon';
import useTheme from '../../../hooks/useTheme';
import ThemeWindow from '../themeSwitchWindow/themeWindow';
import { useState, useRef } from 'react';

const Navbar = () => {

  const { theme, setTheme } = useTheme();

  const themeSwitchWindowRef = useRef(null);

  const handleThemeChange = (themePref: "dark" | "light" | "system") => {
    setTheme(themePref);
    console.log(`Theme set to: ${theme}`);
  };

  const [isThemeWindowOpen, setIsThemeWindowOpen] = useState(false);

  const toggleThemeWindow = () => {
    setIsThemeWindowOpen(!isThemeWindowOpen);
  };

  return (
    <>
        <nav className={style.navContainer}>
          <div className={style.navbarContent}>
            <a>
              <img src={Logo} alt="App Logo that redirects href home on click" className={style.logo} />
            </a>

            <div className={style.navLinksContainer}>
              <a href="/" className={`${style.navLinks} ${style.activeLink}`}>Home</a>
              <button className={style.navLinks}>Items</button>
              <a href="/PostFoundItem" className={style.navLinks}>Post Found Item</a>
              <a href="/ReportLostItem" className={style.navLinks}>Report Lost Item</a>
              <a href="/Help" className={style.navLinks}>Help</a>
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
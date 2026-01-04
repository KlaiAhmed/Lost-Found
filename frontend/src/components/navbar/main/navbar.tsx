import style from './navbar.module.css';
import Logo from '../../../assets/logo.png';
import Icon from '../../../utils/getIcon';
import useTheme from '../../../hooks/useTheme';
import ThemeWindow from '../themeSwitchWindow/themeWindow';
import { useState, useRef, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchOverlay from '../searchOverlay/searchOverlay';
import { AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../../utils/authContext';
import ProfileDropDown from '../profileDropDown/profileDropDown';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  
  const [ overlayOpen, setOverlayOpen ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ isProfileDropDownOpen, setProfileDropDownOpen ] = useState(false);

  const { user, loading } = useContext(AuthContext);

  const themeSwitchWindowRef = useRef(null);
  const profileDropDownRef = useRef(null);

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
            <Link to="/">
              <img src={Logo} alt="App Logo that redirects href home on click" className={style.logo} />
            </Link>

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
              <button className={style.searchButton} onClick={() => setOverlayOpen(true)}>
                <Icon name="search" className={style.searchIcon}/>
              </button>
              <button className={style.themeToggle} onClick={toggleThemeWindow}>
                {theme === "dark" ? <Icon name="moon" className={style.moon}/> 
                : theme === "light" ? <Icon name="sun" className={style.themeIcon}/> 
                :<Icon name="sunmoon" className={style.themeIcon}/>
                }
              </button>
              {loading ?
                <div className={style.loader}>
                  <div className={style.spinner}></div>
                </div>
              :user ? (
                <div className={style.userProfile} onClick={() => setProfileDropDownOpen(!isProfileDropDownOpen)}>
                  <Icon name="user" className={style.userIcon} />
                </div>
                ) :
                <Link to="/signin" className={style.signin}>Sign In</Link>
              }
            </div>
          </div>
          {isThemeWindowOpen && ( <ThemeWindow handleThemeChange={handleThemeChange} theme={theme} ref={themeSwitchWindowRef}  onClickOutside={() => setIsThemeWindowOpen(false)} /> )}
          {isProfileDropDownOpen && ( <ProfileDropDown ref={profileDropDownRef}  onClickOutside={() => setProfileDropDownOpen(false)} /> )}  
        </nav>
        <AnimatePresence mode='wait'>
          {overlayOpen && <SearchOverlay searchTerm={searchTerm} setSearchTerm={setSearchTerm} onClose={() => setOverlayOpen(false)} />}
        </AnimatePresence>
    </>
  );
};

export default Navbar;
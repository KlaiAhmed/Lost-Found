import style from './navbar.module.css';
import Logo from '../../assets/logo.png';
import Icon from '../../utils/getIcon';

// Navbar component
const Navbar = () => {
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
              <button className={style.themeToggle}>
                <Icon name="moon" className={style.themeIcon}/>
              </button>
              <button className={style.signup}>Sign In</button>
            </div>
          </div>
        </nav>
    </>
  );
};

export default Navbar;
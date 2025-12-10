import style from './navbar.module.css';
import Logo from '../../assets/logo.png';

// Navbar component
const Navbar = () => {
  return (
    <>
        <nav className={style.navContainer}>
          <div className={style.navbarContent}>
            <a>
              <img src={Logo} alt="App Logo that redirects href home on click" className={style.logo} />
            </a>

            <div className={style.navas}>
              <button>Search</button>
              <button>Map</button>
              <a href="/PostFoundItem">Post Found Item</a>
              <a href="/ReportLostItem">Report Lost Item</a>
              <a href="/Help">Help</a>
            </div>

            <div className={style.navActions}>
              <button className={style.themeToggle}>Theme Toggle</button>
              <button className={style.profile}>Profile</button>
            </div>
          </div>
        </nav>
    </>
  );
};

export default Navbar;
import style from './profileDropDown.module.css';
import useClickOutside from '../../../hooks/useClickOutside';
import { NavLink } from 'react-router-dom';
import Icon from '../../../utils/getIcon';
import logOut from '../../../utils/logout';
import { useContext } from "react";
import { AuthContext } from "../../../utils/authContext";

type ProfileDropDownProps = {
  ref: React.RefObject<HTMLDivElement>;
  onClickOutside: () => void;
}

const ProfileDropDown = ( {ref, onClickOutside}: ProfileDropDownProps) => {
  useClickOutside({ref: ref, onClickOutside: onClickOutside});
  const { setUser } = useContext(AuthContext);

  return (
    <>
        <div className={style.profileDropDown} ref={ref}>
            <NavLink to="/profile" className={({isActive})=>{ return isActive ? style.active : style.inactive }}>
              <Icon name="user" className={style.icon} />
              Profile
              <Icon name="tick" className={style.tick} />
            </NavLink>
            <span className={style.divider} />
            <button onClick={() => logOut({ setUser })} className={style.logoutButton}>
              <Icon name="logout" className={style.icon} />
              Sign Out
            </button>
        </div>
    </>
    );
}

export default ProfileDropDown;
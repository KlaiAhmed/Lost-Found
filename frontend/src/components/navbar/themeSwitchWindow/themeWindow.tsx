import style from './themeWindow.module.css';
import Icon from '../../../utils/getIcon';
import useClickOutside from '../../../hooks/useClickOutside';

type ThemeWindowProps = {
  handleThemeChange: (themePref: "dark" | "light" | "system") => void;
  theme: "dark" | "light" | "system";
  ref?: React.Ref<HTMLDivElement>;
  onClickOutside?: () => void;
}

const ThemeWindow = ({ handleThemeChange , theme, ref , onClickOutside }: ThemeWindowProps) => {

  useClickOutside({ref: ref, onClickOutside: onClickOutside});

  return (
        <>
            <div className={style.windowContainer} ref={ref}>
              <button onClick={() => handleThemeChange("light")} className={style.button} >
                <Icon name="sun" className={style.icon} />
                Light
                {theme === "light" &&<Icon name="tick" className={style.tick} />}
              </button>
              <button onClick={() => handleThemeChange("dark")} className={style.button} >
                <Icon name="moon" className={style.icon} />
                Dark
                {theme === "dark" &&<Icon name="tick" className={style.tick} />}
              </button>
              <button onClick={() => handleThemeChange("system")} className={style.button} >
                <Icon name="sunmoon" className={style.icon} />
                System Default
                {theme === "system" &&<Icon name="tick" className={style.tick} />}
              </button>
            </div>
        </>
    );
}

export default ThemeWindow;
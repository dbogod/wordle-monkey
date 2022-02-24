import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import styles from '../styles/ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const changeHandler = e => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <input
        id="theme-switcher"
        className={`${styles.input} visually-hidden`}
        type="checkbox"
        onChange={changeHandler}
        checked={resolvedTheme === 'dark'}/>
      <label
        htmlFor="theme-switcher"
        className={styles.toggle}>
        <span className="visually-hidden">
          Check for dark theme, uncheck for light theme
        </span>
        <BsMoonFill className={`${styles.icon} ${styles.iconMoon}`}/>
        <BsSunFill className={`${styles.icon} ${styles.iconSun}`}/>
      </label>
    </>
  );
};

export default ThemeSwitcher;
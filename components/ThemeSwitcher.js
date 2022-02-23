import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const changeHandler = e => {
    setTheme(e.target.checked ? 'light' : 'dark');
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="position-absolute top-0 end-0 p-4">
      <input
        id="theme-switcher"
        className="visually-hidden"
        type="checkbox"
        onChange={changeHandler}
        checked={theme === 'light'}/>
      <label
        htmlFor="theme-switcher"
        className="toggle">
        <span className="visually-hidden">
          Check for dark theme, uncheck for light theme
        </span>
        <BsSunFill className="icon icon--sun"/>
        <BsMoonFill className="icon icon--moon"/>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
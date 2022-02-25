import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Toggle from "./Toggle";

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
    <Toggle
      id="theme-switcher"
      changeHandler={changeHandler}
      checked={resolvedTheme === 'dark'}
      labelText="Check to use dark theme"/>
  );
};

export default ThemeSwitcher;
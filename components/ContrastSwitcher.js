import Toggle from './Toggle';

const ContrastSwitcher = ({ isHiContrast, setIsHiContrast }) => {
  const changeHandler = e => {
    const key = 'wordle-monkey-hi-contrast';
    const checked = e.target.checked;
    localStorage.setItem(key, `${checked}`);
    document.documentElement.setAttribute('data-hi-contrast', `${checked}`);
    setIsHiContrast(checked);
  };

  return (
    <Toggle
      id="contrast-switcher"
      changeHandler={changeHandler}
      checked={isHiContrast}
      labelText="Check for high contrast theme"/>
  );
};

export default ContrastSwitcher;
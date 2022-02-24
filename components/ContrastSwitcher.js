import styles from '../styles/ContrastSwitcher.module.scss';

const ContrastSwitcher = ({isHiContrast, setIsHiContrast}) => {

  const changeHandler = e => {
    const key = 'wordle-monkey-hi-contrast';
    const checked = e.target.checked;
    localStorage.setItem(key, `${checked}`);
    document.documentElement.setAttribute('data-hi-contrast', `${checked}`);
    setIsHiContrast(checked);
  };

  return (
    <>
      <input
        id="contrast-switcher"
        className={`${styles.input} visually-hidden`}
        type="checkbox"
        onChange={changeHandler}
        checked={isHiContrast}/>
      <label
        htmlFor="contrast-switcher"
        className={styles.toggle}>
        <span className="visually-hidden">
          Check for high contrast theme
        </span>
      </label>
    </>
  );
};

export default ContrastSwitcher;
import styles from '../styles/Toggle.module.scss';

const Toggle = ({id, labelText, checked, changeHandler}) => {
  return (
    <>
      <input
        id={id}
        name={id}
        className={`${styles.input} visually-hidden`}
        type="checkbox"
        onChange={changeHandler}
        checked={checked}/>
      <label
        htmlFor={id}
        className={styles.toggle}>
        <span className="visually-hidden">
          {labelText}
        </span>
      </label>
    </>
  );
};

export default Toggle;
﻿import { FaCog } from 'react-icons/fa';
import styles from '../styles/Header.module.scss';

const Header = ({setIsSettingsOpen}) => {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={`${styles.headerContent} py-2`}>
            <h1 className="m-0 text-uppercase">
              Wordle Monkey
            </h1>
            <button
              type="button"
              className="btn-icon p-0 bg-transparent border-0 position-absolute end-0"
              onClick={() => setIsSettingsOpen(true)}>
              <span className="visually-hidden">Settings</span>
              <FaCog className={styles.cog}/>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
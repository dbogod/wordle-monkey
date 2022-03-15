import ThemeSwitcher from './ThemeSwitcher';
import ContrastSwitcher from './ContrastSwitcher';
import { IoClose } from 'react-icons/io5';
import settingsStyles from '../styles/Settings.module.scss';
import headerStyles from '../styles/Header.module.scss';

const Settings = ({ isOpen, setIsSettingsOpen, isHiContrast, setIsHiContrast }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <section className={`${settingsStyles.settings} position-absolute top-0 w-100`}>
      <div className="container">
        <div className={`${headerStyles.headerContent} py-2`}>
          <h1 className="text-uppercase m-0">
            Settings
          </h1>
          <button
            type="button"
            className="btn-icon p-0 bg-transparent border-0 position-absolute end-0"
            onClick={() => setIsSettingsOpen(false)}>
            <IoClose className={settingsStyles.close}/>
          </button>
        </div>
      </div>

      <ul className="m-0 p-0 w-100">
        <li
          className={`${settingsStyles.settingsItem} container d-flex py-4 justify-content-between align-items-center list-unstyled`}>
          <span>Dark mode</span>
          <ThemeSwitcher/>
        </li>
        <li
          className={`${settingsStyles.settingsItem} container d-flex py-4 justify-content-between align-items-center list-unstyled`}>
          <span>High contrast mode</span>
          <ContrastSwitcher
            isHiContrast={isHiContrast}
            setIsHiContrast={setIsHiContrast}/>
        </li>
      </ul>
    </section>
  );
};

export default Settings;


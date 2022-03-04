import styles from '../styles/Footer.module.scss';
import { BsTwitter, BsGithub } from 'react-icons/bs';
import { BiCoffeeTogo } from 'react-icons/bi';

const Footer = ({ isSettingsOpen }) => {
  return (
    <>
      <footer className={`${styles.footer} ${isSettingsOpen ? 'position-absolute bottom-0' : ''} w-100`}>
        <div className="container">
          <div className={`${styles.footerContent} py-1`}>

            <a
              href="https://twitter.com/bogod"
              aria-labelledby="twitter-link-desc">
                <span
                  id="twitter-link-desc"
                  className="visually-hidden">
                Follow me on Twitter
              </span>
              <BsTwitter className={styles.iconLink}/>
            </a>
            &nbsp; | &nbsp;
            <a
              href="https://github.com/dbogod/wordle-monkey"
              aria-labelledby="github-link-desc">
                <span
                  id="github-link-desc"
                  className="visually-hidden">
                  Take a look at the source code on Github
                </span>
              <BsGithub className={styles.iconLink}/>
            </a>
            &nbsp; | &nbsp;
            <a
              href="https://ko-fi.com/bogod"
              aria-labelledby="github-link-desc"
              title="Buy me a coffee!">
                <span
                  id="github-link-desc"
                  className="visually-hidden">
                  Like the monkey? Buy the organ grinder a coffee!
                </span>
              <BiCoffeeTogo className={styles.iconLink}/>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
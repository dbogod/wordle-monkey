import styles from '../styles/Accordion.module.scss';
import { FiChevronDown } from 'react-icons/fi';

const AccordionSection = ({ id, title, visibleSection, clickHandler, children }) => {
  const isVisible = visibleSection === id;
  return (
    <div className={styles.accordionSection}>
      <h3 className="m-0">
        <button
          type="button"
          className="w-100 my-1 border-0 px-0 py-2 d-flex align-items-center bg-transparent"
          aria-controls={id}
          aria-expanded={isVisible}
          onClick={() => clickHandler(id)}>
          <FiChevronDown/>
          {title}
        </button>
      </h3>
      <div
        id={id}
        className={`mb-3 px-1 ${isVisible ? '' : 'd-none'}`}>
        {children}
      </div>
    </div>
  );
};

export default AccordionSection;
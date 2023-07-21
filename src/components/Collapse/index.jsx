import React, { useState } from "react";

import styles from "./styles.module.scss";

const Collapse = ({ title = "", children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.collapseContainer}>
      <button
        type="button"
        className={`${styles.accordionContainer} ${
          isExpanded ? styles.active : ""
        }`}
        onClick={() => setIsExpanded((val) => !val)}
      >
        <div>{title}</div>
        {isExpanded ? (
          <i className="bi bi-caret-down-fill" />
        ) : (
          <i className="bi bi-caret-up-fill" />
        )}
      </button>
      {isExpanded && children}
    </div>
  );
};

export default Collapse;

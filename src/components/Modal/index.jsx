import React from "react";

import styles from "./styles.module.scss";

const Modal = ({ onAccept, onCanceled }) => {
  return (
    <div className={styles.modalLayout}>
      <div className={styles.modalContainer}>
        <p>Apakah anda yakin untuk menghapus item tersebut?</p>
        <div className={styles.actionsContainer}>
          <button
            type="button"
            className={styles.leftButton}
            onClick={onAccept}
          >
            YA
          </button>
          <button
            type="button"
            className={styles.rightButton}
            onClick={onCanceled}
          >
            TIDAK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

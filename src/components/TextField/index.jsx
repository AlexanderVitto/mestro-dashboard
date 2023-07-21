import React from "react";

import styles from "./styles.module.scss";

export const Input = ({ label, type = "text", register, required }) => (
  <div className={styles.textFieldContainer}>
    <label className={styles.label}>{label}</label>
    <input
      type={type}
      {...register(label.toLowerCase().replace(/\s/g, "_"), { required })}
      className={styles.input}
    />
  </div>
);

export const TextArea = ({ label, register, required }) => (
  <div className={styles.textFieldContainer}>
    <label className={styles.label}>{label}</label>
    <textarea
      {...register(label.toLowerCase().replace(/\s/g, "_"), { required })}
      className={styles.textArea}
    />
  </div>
);

export const InputImage = ({ label, register, required }) => (
  <div className={styles.textFieldContainer}>
    <label className={styles.label}>{label}</label>
    <input
      type="file"
      {...register(label.toLowerCase().replace(/\s/g, "_"), { required })}
    />
  </div>
);

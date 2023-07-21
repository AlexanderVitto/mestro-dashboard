import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.scss";

const TopBar = ({ title = "", path = "", trailingEnabled = true }) => {
  return (
    <div className={styles.topBarContainer}>
      <div className={styles.titleContainer}>
        <div>{title}</div>
      </div>
      {trailingEnabled && (
        <div className={styles.searchContainer}>
          {/* <form>
            <input
              type="text"
              name="search"
              placeholder="Cari data disini"
              className={styles.searchBox}
            />
          </form> */}
          <NavLink to={path} className={styles.addButton}>
            Tambah
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default TopBar;

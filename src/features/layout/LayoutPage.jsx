import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Collapse from "../../components/Collapse";
import { selectToken } from "../auth/authSlice";

import styles from "./layout.module.scss";

const LayoutPage = () => {
  const token = useSelector(selectToken);

  return (
    <div className={styles.layoutContainer}>
      {!token && <Navigate to="/" replace={true} />}
      <div className={styles.drawerContainer}>
        <div className={styles.logo}>Mestro</div>
        <div className={styles.menuContainer}>
          <Collapse title="Rumah Sakit BPJS">
            <NavLink
              to="/dashboard/hospitals/short/bpjs"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              {"< 4,5 jam"}
            </NavLink>
            <NavLink
              to="/dashboard/hospitals/mid/bpjs"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              {"< 4,5 jam - 24 jam"}
            </NavLink>
            <NavLink
              to="/dashboard/hospitals/long/bpjs"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              {"> 24 jam"}
            </NavLink>
          </Collapse>
          <Collapse title="Rumah Sakit Mandiri">
            <NavLink
              to="/dashboard/hospitals/short/mandiri"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              {"< 4,5 jam"}
            </NavLink>
            <NavLink
              to="/dashboard/hospitals/mid/mandiri"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              {"< 4,5 jam - 24 jam"}
            </NavLink>
            <NavLink
              to="/dashboard/hospitals/long/mandiri"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              {"> 24 jam"}
            </NavLink>
          </Collapse>

          <NavLink
            to="/dashboard/ambulances"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            Ambulans
          </NavLink>

          <NavLink
            to="/dashboard/articles"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            Artikel
          </NavLink>
          {/* <NavLink
            to="/dashboard/configurations"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            Configurations
          </NavLink> */}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LayoutPage;

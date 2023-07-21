import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Modal from "../../../components/Modal";
import { useDeleteAmbulanceByIdMutation } from "../../api/apiSlice";
import { remove, selectToken } from "../../auth/authSlice";
import { setData } from "../ambulancesSlice";
import styles from "./styles.module.scss";

const TableItem = ({
  id,
  number,
  name,
  address,
  distance,
  phoneNumber,
  onRemove,
  data,
}) => {
  const [isModalShowed, setIsModalShowed] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [deleteAmbulance, { error }] = useDeleteAmbulanceByIdMutation();

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        window.alert("Sesi anda telah habis");
        dispatch(remove());
      } else {
        window.alert("Server bermasalah");
      }
    }
  }, [error, dispatch]);

  const onDelete = async () => {
    try {
      const result = await deleteAmbulance({ id, token }).unwrap();

      if (result.status === "success") {
        window.alert("Hapus berhasil");
      } else {
        window.alert("Hapus gagal!");
      }
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };

  function thousandSep(val) {
    return String(val)
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3}\B)/g, "$1,")
      .split("")
      .reverse()
      .join("");
  }
  return (
    <>
      <div className={styles.itemContainer}>
        <div>{number}</div>
        <div className={styles.ambulanceContainer}>
          <div className={styles.description}>
            <div className={styles.name}>
              {name} ({thousandSep(distance.toFixed(0))}km)
            </div>
            <div className={styles.address}>{address}</div>
          </div>
        </div>
        <div className={styles.phoneNumber}>{phoneNumber}</div>
        <div className={styles.actionContainer}>
          <NavLink
            to={`/dashboard/addambulance/${id}`}
            onClick={() => dispatch(setData(data))}
            className={styles.edit}
          >
            <i className="bi bi-pencil-square"></i>
          </NavLink>
          <button
            type="button"
            className={styles.delete}
            onClick={() => setIsModalShowed(true)}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>
      <div className={styles.divider} />
      {isModalShowed && (
        <Modal
          onAccept={() => {
            setIsModalShowed(false);
            onDelete();
            onRemove();
          }}
          onCanceled={() => {
            setIsModalShowed(false);
          }}
        />
      )}
    </>
  );
};

export default TableItem;

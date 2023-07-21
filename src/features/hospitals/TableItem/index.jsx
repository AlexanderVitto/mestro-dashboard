import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Modal from "../../../components/Modal";
import { useDeleteHospitalByIdMutation } from "../../api/apiSlice";
import { remove, selectToken } from "../../auth/authSlice";
import { setData, removeData } from "../hospitalsSlice";
import styles from "./styles.module.scss";

const TableItem = ({
  id,
  number,
  name,
  address,
  image,
  phoneNumber,
  bpjsStatus,
  windowParam,
  statusParam,
  data,
}) => {
  const [isModalShowed, setIsModalShowed] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [deleteHospitalById, { error }] = useDeleteHospitalByIdMutation();

  const label = bpjsStatus.toLowerCase() === "mandiri" ? "Mandiri" : "BPJS";

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        window.alert("Sesi anda telah habis");
        dispatch(remove());
      } else {
        window.alert("Server bermasalah");
      }
    }
  }, [error, number, dispatch]);

  const onDelete = async () => {
    try {
      const result = await deleteHospitalById({ id, token }).unwrap();

      if (result.status === "success") {
        dispatch(removeData(number - 1));
        window.alert("Hapus berhasil");
      } else {
        window.alert("Hapus gagal!");
      }
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };

  return (
    <>
      <div className={styles.itemContainer}>
        <div>{number}</div>
        <div className={styles.hospitalContainer}>
          <img
            width="100"
            height="100"
            style={{ borderRadius: "10px" }}
            alt="imageItem"
            src={`data:image/png;base64,${image}`}
          />
          <div className={styles.description}>
            <div className={styles.name}>{name}</div>
            <div className={styles.address}>{address}</div>
          </div>
        </div>
        <div className={styles.statusContainer}>
          <div className={styles.contactContainer}>
            <div className={styles.label}>{label}</div>
            <div className={styles.phoneNumber}>{phoneNumber}</div>
          </div>
        </div>
        <div className={styles.actionContainer}>
          <NavLink
            to={`/dashboard/addhospitals/${windowParam}/${statusParam}/${id}`}
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

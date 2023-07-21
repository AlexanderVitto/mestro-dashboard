import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Modal from "../../../components/Modal";
import { useDeleteArticleByIdMutation } from "../../api/apiSlice";
import { remove, selectToken } from "../../auth/authSlice";
import { setData, removeData } from "../articlesSlice";
import styles from "./styles.module.scss";

const TableItem = ({
  id,
  number,
  category,
  text,
  title,
  date,
  image1,
  image2,
  image3,
  source,
  data,
}) => {
  const [isModalShowed, setIsModalShowed] = useState(false);
  const [showFullDescription, setFullDescription] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [deleteArticle, { error }] = useDeleteArticleByIdMutation();

  const tempText = showFullDescription ? text : text.slice(0, 150);

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
      const result = await deleteArticle({ id, token }).unwrap();

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
        <div className={styles.imageContainer}>
          <img
            width="100"
            height="100"
            style={{ borderRadius: "10px" }}
            alt="imageItem"
            src={`data:image/png;base64,${image1}`}
          />
          {image2 && (
            <img
              width="100"
              height="100"
              style={{ borderRadius: "10px" }}
              alt="imageItem"
              src={`data:image/png;base64,${image2}`}
            />
          )}
          {image3 && (
            <img
              width="100"
              height="100"
              style={{ borderRadius: "10px" }}
              alt="imageItem"
              src={`data:image/png;base64,${image3}`}
            />
          )}
        </div>
        <div className={styles.description}>
          <div className={styles.itemContainer}>
            <div className={styles.label}>{"Judul :"}</div>
            <div>{title}</div>
          </div>
          <div className={styles.itemContainer}>
            <div className={styles.label}>{"Konten :"}</div>
            <div>
              {tempText}
              <span
                style={{ fontWeight: "800" }}
                onClick={() => setFullDescription((val) => !val)}
              >
                {showFullDescription
                  ? " tampilkan sebagian"
                  : "... tampilkan semua"}
              </span>
            </div>
          </div>
          <div className={styles.itemContainer}>
            <div className={styles.label}>{"Tanggal :"}</div>
            <div>{date}</div>
          </div>
          <div className={styles.itemContainer}>
            <div className={styles.label}>{"Kategori :"}</div>
            <div>{category}</div>
          </div>
          <div className={styles.itemContainer}>
            <div className={styles.label}>{"Sumber :"}</div>
            <div>{source}</div>
          </div>
        </div>
        <div className={styles.actionContainer}>
          <NavLink
            to={`/dashboard/addarticle/${id}`}
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

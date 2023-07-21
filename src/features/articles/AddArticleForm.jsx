import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input, TextArea, InputImage } from "../../components/TextField";
import TopBar from "../../components/TopBar";
import {
  hospitalsApiSlice,
  useAddNewArticleMutation,
  useUpdateNewArticleMutation,
} from "../api/apiSlice";
import { remove, selectToken } from "../auth/authSlice";
import { selectedData } from "./articlesSlice";

import styles from "./addArticleForm.module.scss";

const AddArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const token = useSelector(selectToken);
  const tempData = useSelector(selectedData);
  const dispatch = useDispatch();
  const [addNewArticle, { error }] = useAddNewArticleMutation();
  const [updateArticle, { errorUpdate }] = useUpdateNewArticleMutation();
  console.log("id", id, tempData, errorUpdate);

  useEffect(() => {
    if ((id, tempData)) {
      let defaultValues = {};
      defaultValues.judul = tempData.title;
      defaultValues.konten = tempData.text;
      defaultValues.kategori = tempData.category;
      defaultValues.sumber = tempData.source;
      reset({ ...defaultValues });
    }
  }, [reset, tempData, id]);

  useEffect(() => {
    if (error || errorUpdate) {
      if (error?.status === 401 || errorUpdate?.status === 401) {
        window.alert("Sesi anda telah habis");
        dispatch(remove());
      } else {
        window.alert("Server bermasalah");
      }
    }
  }, [error, errorUpdate, dispatch]);

  const onSubmit = async (data) => {
    try {
      const payload = new FormData();

      payload.append("title", data.judul);
      payload.append("text", data.konten);
      payload.append("category", data.kategori);
      payload.append("source", data.sumber);
      payload.append("file", data.gambar_konten[0]);

      console.log("id", id);
      if (id === undefined) {
        const result = await addNewArticle({ payload, token }).unwrap();
        if (result.status === "success") {
          window.alert("Input berhasil");
          dispatch(hospitalsApiSlice.util.invalidateTags(["Articles"]));
          reset();
        } else {
          window.alert("Input gagal!");
        }
      } else {
        const result = await updateArticle({ id, payload, token }).unwrap();
        if (result.status === "success") {
          window.alert("Edit berhasil");
          reset();
          navigate(-1);
        } else {
          window.alert("Edit gagal!");
        }
      }
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };

  return (
    <div className={styles.addArticleContainer}>
      <TopBar
        title={`${id === undefined ? "Tambah" : "Ubah"} Data Artikel`}
        trailingEnabled={false}
      />
      <div className={styles.contentContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <Input label="Judul" register={register} required />
          <TextArea label="Konten" register={register} required />
          <div className={styles.latLong}>
            <Input label="Kategori" register={register} required />
            <Input label="Sumber" register={register} required />
          </div>
          <InputImage label="Gambar konten" register={register} required />

          <div className={styles.actionsContainer}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles.backButton}
            >
              Kembali
            </button>
            <input
              type="submit"
              value="Simpan"
              className={styles.submitButton}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticleForm;

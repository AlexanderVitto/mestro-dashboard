import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input, TextArea } from "../../components/TextField";
import TopBar from "../../components/TopBar";
import {
  useUpdateNewAmbulanceMutation,
  useAddNewAmbulanceMutation,
} from "../api/apiSlice";
import { remove, selectToken } from "../auth/authSlice";
import { selectedData } from "./ambulancesSlice";

import styles from "./addAmbulanceForm.module.scss";

const AddAmbulanceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const token = useSelector(selectToken);
  const tempData = useSelector(selectedData);
  const dispatch = useDispatch();
  const [addNewAmbulance, { error }] = useAddNewAmbulanceMutation();
  const [updateAmbulance, { errorUpdate }] = useUpdateNewAmbulanceMutation();

  useEffect(() => {
    if (id) {
      let defaultValues = {};
      defaultValues.nama = tempData.name;
      defaultValues.alamat = tempData.address;
      defaultValues.longitude = tempData.category;
      defaultValues.latitude = tempData.source;
      defaultValues.nomor_telepon = tempData.phone_num;
      reset({ ...defaultValues });
    }
  }, [reset, tempData, id]);

  useEffect(() => {
    if (error || errorUpdate) {
      if (error.status === 401 || errorUpdate.status === 401) {
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

      payload.append("name", data.nama);
      payload.append("address", data.alamat);
      payload.append("longitude", data.longitude);
      payload.append("latitude", data.latitude);
      payload.append("phone_number", data.nomor_telepon);

      if (id === undefined) {
        const result = await addNewAmbulance({ payload, token }).unwrap();

        if (result.status === "success") {
          window.alert("Input berhasil");
          reset();
        } else {
          window.alert("Input gagal!");
        }
      } else {
        const result = await updateAmbulance({ id, payload, token }).unwrap();
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
    <div className={styles.addAmbulanceContainer}>
      <TopBar
        title={`${id === undefined ? "Tambah" : "Ubah"} Data Ambulans`}
        trailingEnabled={false}
      />
      <div className={styles.contentContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <Input label="Nama" register={register} required />
          <TextArea label="Alamat" register={register} required />
          <div className={styles.latLong}>
            <Input label="Longitude" register={register} required />
            <Input label="Latitude" register={register} required />
          </div>
          <Input label="Nomor Telepon" register={register} required />

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

export default AddAmbulanceForm;

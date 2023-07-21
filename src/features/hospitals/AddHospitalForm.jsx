import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  convertWindowToName,
  convertStatusToName,
} from "../../utils/convertToName";
import { Input, TextArea, InputImage } from "../../components/TextField";
import TopBar from "../../components/TopBar";
import {
  hospitalsApiSlice,
  useAddNewHospitalMutation,
  useUpdateNewHospitalMutation,
} from "../api/apiSlice";
import { remove, selectToken } from "../auth/authSlice";
import { selectedData } from "./hospitalsSlice";

import styles from "./addHospitalForm.module.scss";

const AddHospitalForm = () => {
  const { window: wdw, status, id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const token = useSelector(selectToken);
  const tempData = useSelector(selectedData);
  const dispatch = useDispatch();
  const [addNewHospital, { error }] = useAddNewHospitalMutation();
  const [updateHospital, { errorUpdate }] = useUpdateNewHospitalMutation();

  const windowName = convertWindowToName(wdw);
  const statusName = convertStatusToName(status);

  console.log("id", id, tempData);

  useEffect(() => {
    if (id) {
      let defaultValues = {};
      defaultValues.nama_rumah_sakit = tempData.name;
      defaultValues.gambar_rumah_sakit = tempData.image;
      defaultValues.alamat = tempData.address;
      defaultValues.longitude = tempData.longitude;
      defaultValues.latitude = tempData.latitude;
      defaultValues.nomor_telepon = tempData.phone_num;
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
      let bpjs_short_window_status = false;
      let mandiri_short_window_status = false;
      let bpjs_mid_window_status = false;
      let mandiri_mid_window_status = false;
      let bpjs_long_window_status = false;
      let mandiri_long_window_status = false;

      switch (wdw) {
        case "short":
          if (status === "bpjs") {
            bpjs_short_window_status = true;
          } else {
            mandiri_short_window_status = true;
          }
          break;
        case "mid":
          if (status === "bpjs") {
            bpjs_mid_window_status = true;
          } else {
            mandiri_mid_window_status = true;
          }
          break;
        case "long":
          if (status === "bpjs") {
            bpjs_long_window_status = true;
          } else {
            mandiri_long_window_status = true;
          }
          break;
        default:
      }

      payload.append("name", data.nama_rumah_sakit);
      payload.append("file", data.gambar_rumah_sakit[0]);
      payload.append("address", data.alamat);
      payload.append("longitude", data.longitude);
      payload.append("latitude", data.latitude);
      // bpjs_short_window_status
      payload.append("bpjs_short_window_status", bpjs_short_window_status);
      // bpjs_short_window_number
      payload.append("bpjs_short_window_number", data.nomor_telepon);
      // mandiri_short_window_status
      payload.append(
        "mandiri_short_window_status",
        mandiri_short_window_status
      );
      // mandiri_short_window_number
      payload.append("mandiri_short_window_number", data.nomor_telepon);
      // bpjs_mid_window_status
      payload.append("bpjs_mid_window_status", bpjs_mid_window_status);
      // bpjs_mid_window_number
      payload.append("bpjs_mid_window_number", data.nomor_telepon);
      // mandiri_mid_window_status
      payload.append("mandiri_mid_window_status", mandiri_mid_window_status);
      // mandiri_mid_window_number
      payload.append("mandiri_mid_window_number", data.nomor_telepon);
      // bpjs_long_window_status
      payload.append("bpjs_long_window_status", bpjs_long_window_status);
      // bpjs_long_window_number
      payload.append("bpjs_long_window_number", data.nomor_telepon);
      // mandiri_long_window_status
      payload.append("mandiri_long_window_status", mandiri_long_window_status);
      // mandiri_long_window_number
      payload.append("mandiri_long_window_number", data.nomor_telepon);

      console.log("token", token);
      if (id === undefined) {
        const result = await addNewHospital({ payload, token }).unwrap();
        if (result.status === "success") {
          window.alert("Input berhasil");
          dispatch(hospitalsApiSlice.util.invalidateTags(["Hospital"]));
          reset();
        } else {
          window.alert("Input gagal!");
        }
      } else {
        const result = await updateHospital({ id, payload, token }).unwrap();
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
    <div className={styles.addHospitalContainer}>
      <TopBar
        title={`${
          id === undefined ? "Tambah" : "Ubah"
        } Data Rumah Sakit ${statusName} ${windowName}`}
        trailingEnabled={false}
      />
      <div className={styles.contentContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <Input label="Nama Rumah Sakit" register={register} required />
          <InputImage label="Gambar Rumah Sakit" register={register} required />
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

export default AddHospitalForm;

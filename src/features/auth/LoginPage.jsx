import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useGetTokenMutation } from "../api/apiSlice";
import { selectToken, setCredentials } from "./authSlice";

import styles from "./login.module.scss";

const LoginPage = () => {
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [getToken] = useGetTokenMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.userName);
      formData.append("password", data.password);

      const resToken = await getToken(formData).unwrap();
      setErrMessage("");
      dispatch(setCredentials({ user: data.userName, token: resToken }));
    } catch (err) {
      console.error("Failed to save the post: ", err.status);
      if (err.status === 401) {
        setErrMessage("Username or password is wrong");
      } else {
        setErrMessage("Something went wrong");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      {token && <Navigate to="/dashboard" replace={true} />}
      {errMessage && <h5 style={{ color: "red" }}>{errMessage}</h5>}
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="User Name"
          className={styles.input}
          {...register("userName", { required: "Please enter your user name" })}
        />
        <div className={styles.passwordWrap}>
          <input
            type={isPasswordShowed ? "text" : "password"}
            placeholder="Password"
            name="password"
            autoComplete="on"
            className={styles.input}
            {...register("password", {
              required: "Please enter your password",
            })}
          />
          <button
            type="button"
            className={styles.icon}
            onClick={() => setIsPasswordShowed((val) => !val)}
          >
            {isPasswordShowed ? (
              <i className="bi bi-eye-slash" style={{ fontSize: "20px" }} />
            ) : (
              <i className="bi bi-eye" style={{ fontSize: "20px" }} />
            )}
          </button>
        </div>

        <input type="submit" value="Masuk" className={styles.submitButton} />
      </form>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import styles from "./LogIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { enterLoginForm } from "../redux/loginSlice";
import { fetchLogin } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import errorsHandler from "../helpers/errorsHandler";

const LogIn = () => {
  // let myuuid = uuidv4();
  const { status, errors } = useSelector((store) => store.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const login = useSelector((store) => store.login.value);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(enterLoginForm({ email: username, password: password }));
    // dispatch(fetchLogin({ email: username, password: password }));

    try {
      const { token } = await dispatch(
        fetchLogin({ email: username, password: password })
      ).unwrap();

      if (token) {
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.contain}>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            className={styles["enjoy-css"]}
            type="email"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            className={styles["enjoy-css"]}
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit" className={styles["button-css"]}>
          Login
        </button>
      </form>
      {status === "loading" && <p>loading</p>}
      {errorsHandler(errors)}
    </div>
  );
};

export { LogIn };

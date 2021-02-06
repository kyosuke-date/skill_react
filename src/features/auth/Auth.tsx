import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme } from "@material-ui/core/styles";
import styles from "./Auth.module.css";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  fetchAsyncLogin,
  fetchAsyncRegister,
  toggleMode,
  selectIsLoginView,
} from "./authSlice";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(3),
    padding: theme.spacing(0.6, 2),
  },
  tf: {
    width: "35vh",
    maxWidth: 300,
    minWidth: 100,
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const isLoginView = useSelector(selectIsLoginView);
  const [credential, setCredential] = useState({ username: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredential({ ...credential, [name]: value });
  };

  const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(credential));
    } else {
      const result = await dispatch(fetchAsyncRegister(credential));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(credential));
      }
    }
  };

  return (
    <div className={styles.root}>
      <h1>{isLoginView ? "Login" : "Register"}</h1>
      <br />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.tf}
        type="text"
        label="UserName"
        name="username"
        value={credential.username}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.tf}
        type="password"
        label="Password"
        name="password"
        value={credential.password}
        onChange={handleInputChange}
      />
      <Button
        className={classes.button}
        variant="outlined"
        color="inherit"
        size="small"
        onClick={login}
      >
        {isLoginView ? "Login" : "Register"}
      </Button>
      <span className={styles.root_span} onClick={() => dispatch(toggleMode())}>
        {isLoginView ? "Create New Account" : "Back To Login"}
      </span>
    </div>
  );
};

export default Auth;

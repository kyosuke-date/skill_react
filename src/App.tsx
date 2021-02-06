import React, { useEffect } from "react";
import styles from "./App.module.css";
import { Grid, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./app/store";
import { fetchAsyncGetMyProf } from "./features/auth/authSlice";
import {
  fetchAsyncGetSkills,
  fetchAsyncGetUsers,
  fetchAsyncGetCategory,
  selectSelectedSkill,
} from "./features/skills/skillSlice";

import SkillList from "./features/skills/SkillList";
import SkillDisplay from "./features/skills/SkillDisplay";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedSkill = useSelector(selectSelectedSkill);

  const logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchBootloader = async () => {
      await dispatch(fetchAsyncGetSkills());
      await dispatch(fetchAsyncGetUsers());
      await dispatch(fetchAsyncGetCategory());
      await dispatch(fetchAsyncGetMyProf());
    };
    fetchBootloader();
  }, [dispatch]);

  return (
    <div>
      <div className={styles.logout_icon}>
        <button className={styles.icon} onClick={logout}>
          <ExitToAppIcon fontSize="large" />
        </button>
      </div>
      <div className={styles.list}>
        <SkillList />
      </div>
      <Grid className={styles.display} container spacing={1}>
        <Grid item xs={9}>
          {selectedSkill.name && <SkillDisplay />}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;

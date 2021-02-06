import React from "react";
import { Link } from "react-router-dom";
import styles from "./SkillForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Fab,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import StopIcon from "@material-ui/icons/Stop";
import {
  editSkill,
  selectEditedSkill,
  selectCategory,
  fetchAsyncCreateSkill,
  fetchAsyncUpdateSkill,
  fetchAsyncDeleteSkill,
} from "./skillSlice";

const useStyles = makeStyles((theme: Theme) => ({
  dept: {
    marginLeft: theme.spacing(1),
    minWidth: "40px",
  },
  name: {
    display: "flex",
    alignItems: "base-line",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "75vw",
    minWidth: "300px",
  },
  button: {
    width: "120px",
    margin: "0 10px",
    padding: "8px 0",
  },
  adjust: {
    marginLeft: "none",
  },
  delete: {
    position: "fixed",
    bottom: "8px",
    right: "8px",
  },
  link: {
    textDecoration: "none",
  },
}));

const SkillForm: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedSkill = useSelector(selectEditedSkill);
  const category = useSelector(selectCategory);

  const catOptions = category.map((cat) => (
    <MenuItem key={cat.id} value={cat.id}>
      {cat.dept}
    </MenuItem>
  ));

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(editSkill({ ...editedSkill, [name]: value }));
  };

  const handleCategory = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as number;
    dispatch(editSkill({ ...editedSkill, dept: value }));
  };

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>
        {editedSkill.id === "" ? "Make Skill Sheet" : "Update Skill Sheet"}
      </h3>
      <Grid className={classes.form} container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.name}>
            <TextField
              label="Your Name"
              type="text"
              name="name"
              InputLabelProps={{
                shrink: true,
              }}
              value={editedSkill.name}
              onChange={handleInput}
            />
            &nbsp;&nbsp;&nbsp;&nbsp; <p style={{ padding: "none" }}>dept:</p>
            <Select
              className={classes.dept}
              name="dept"
              value={editedSkill.dept}
              onChange={handleCategory}
            >
              {catOptions}
            </Select>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.adjust}
                label="Dev Lang"
                name="dev"
                multiline
                fullWidth
                rows={5}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={editedSkill.dev}
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Infra"
                name="infla"
                multiline
                fullWidth
                rows={5}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={editedSkill.infla}
                onChange={handleInput}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Speciality"
                name="speciality"
                multiline
                fullWidth
                rows={5}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={editedSkill.speciality}
                onChange={handleInput}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Career"
                name="career"
                multiline
                fullWidth
                rows={5}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={editedSkill.career}
                onChange={handleInput}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Myself"
            name="myself"
            multiline
            fullWidth
            rows={5}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={editedSkill.myself}
            onChange={handleInput}
          />
        </Grid>
      </Grid>
      <div className={styles.btn}>
        <Link className={classes.link} to="/skills">
          <Button
            className={classes.button}
            size="small"
            color="secondary"
            variant="outlined"
            startIcon={<StopIcon />}
          >
            Cancel
          </Button>
        </Link>
        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          startIcon={<CheckIcon />}
          onClick={() => {
            editedSkill.id === ""
              ? dispatch(fetchAsyncCreateSkill(editedSkill))
              : dispatch(fetchAsyncUpdateSkill(editedSkill));
            window.location.href = "/skills";
          }}
        >
          {editedSkill.id === "" ? "Create" : "Update"}
        </Button>
        {editedSkill.id !== "" && (
          <Fab
            variant="extended"
            className={classes.delete}
            color="primary"
            size="small"
            onClick={() => {
              dispatch(fetchAsyncDeleteSkill(editedSkill.id));
              window.location.href = "/skills";
            }}
          >
            <DeleteIcon />
          </Fab>
        )}
      </div>
    </div>
  );
};

export default SkillForm;

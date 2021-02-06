import React, { useState } from "react";
import styles from "./SkillList.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectLoginUser } from "../auth/authSlice";
import {
  selectSkills,
  editSkill,
  selectSkill,
  initialState,
} from "./skillSlice";

import {
  Fab,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  table: {
    position: "relative",
    overflow: "hidden",
    overflowY: "auto",
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "transparent",
    color: "dimgray",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "20px",
  },
  fabutton: {
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "20px",
  },
  create_new: {
    position: "fixed",
    bottom: "14px",
    left: "14px",
    zIndex: 100,
  },
  pos: {
    marginLeft: 5,
  },
  menu_btn: {
    position: "fixed",
    top: "8px",
    left: "14px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "black",
    cursor: "pointer",
    zIndex: 100,
  },
}));

const SkillList: React.FC = () => {
  const classes = useStyles();
  const skills = useSelector(selectSkills); //スキル一覧
  const loginUser = useSelector(selectLoginUser);
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const isCreatedSkill = skills.filter((skill) => skill.owner === loginUser.id);

  return (
    <div className={styles.root}>
      <button className={styles.menu_btn} onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon fontSize="large" />
      </button>
      {isOpen && (
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>　</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow
                key={skill.id}
                hover={true}
                onClick={() => dispatch(selectSkill(skill))}
              >
                <TableCell size="small" className={classes.cell}>
                  <div>
                    <Typography variant="subtitle1">{skill.name}</Typography>
                    <Typography variant="subtitle2">
                      {skill.dept_name} &nbsp; &nbsp;
                    </Typography>
                  </div>
                  {skill.owner === loginUser.id && (
                    <Link to="/fillin">
                      <Fab
                        variant="extended"
                        className={classes.pos}
                        color="primary"
                        size="small"
                        onClick={() => {
                          dispatch(
                            editSkill({
                              id: skill.id,
                              name: skill.name,
                              dept: skill.dept,
                              career: skill.career,
                              infla: skill.infla,
                              dev: skill.dev,
                              speciality: skill.speciality,
                              myself: skill.myself,
                            })
                          );
                        }}
                      >
                        <EditOutlinedIcon className={classes.fabutton} />
                      </Fab>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {isCreatedSkill.length === 0 && (
        <Link to="/fillin">
          <Fab
            color="primary"
            className={classes.create_new}
            onClick={() => {
              dispatch(editSkill(initialState.editedSkill));
              dispatch(selectSkill(initialState.selectedSkill));
            }}
          >
            <AddIcon className={classes.fabutton} />
          </Fab>
        </Link>
      )}
    </div>
  );
};

export default SkillList;

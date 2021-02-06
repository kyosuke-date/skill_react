import React from "react";
import styles from "./SkillDisplay.module.css";
import { useSelector } from "react-redux";
import { selectSelectedSkill } from "./skillSlice";

const SkillDisplay: React.FC = () => {
  const selectedSkill = useSelector(selectSelectedSkill);

  return (
    <div className={styles.root}>
      <div className={styles.name}>
        <h3>{selectedSkill.name}</h3> &nbsp; &nbsp;
        <h5>dept: {selectedSkill.dept_name}</h5>
      </div>
      <div className={styles.lang}>
        <h5>dev Lang</h5>
        <p className="box">{selectedSkill.dev}</p>
      </div>
      <div className={styles.lang}>
        <h5>infra skill</h5>
        <p className="box">{selectedSkill.infla}</p>
      </div>
      <div className={styles.lang}>
        <h5>speciality</h5>
        <p className="box">{selectedSkill.speciality}</p>
      </div>
      <div className={styles.lang}>
        <h5>my self</h5>
        <p className="box">{selectedSkill.myself}</p>
      </div>
      <div className={styles.lang}>
        <h5>career</h5>
        <p className="box">{selectedSkill.career}</p>
      </div>
    </div>
  );
};

export default SkillDisplay;

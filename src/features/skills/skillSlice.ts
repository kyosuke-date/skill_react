import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { READ_SKILL, POST_SKILL, CATEGORY, SKILL_STATE, USER } from "../types";

export const fetchAsyncGetSkills = createAsyncThunk(
  "skill/getSkill",
  async () => {
    const res = await axios.get<READ_SKILL[]>(
      `${process.env.REACT_APP_API_URL}/api/skills/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
export const fetchAsyncGetUsers = createAsyncThunk(
  "skill/getUsers",
  async () => {
    const res = await axios.get<USER[]>(
      `${process.env.REACT_APP_API_URL}/api/users/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
export const fetchAsyncGetCategory = createAsyncThunk(
  "skill/getCategory",
  async () => {
    const res = await axios.get<CATEGORY[]>(
      `${process.env.REACT_APP_API_URL}/api/category/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
export const fetchAsyncCreateCategory = createAsyncThunk(
  "skill/createCategory",
  async (dept: string) => {
    const res = await axios.post<CATEGORY>(
      `${process.env.REACT_APP_API_URL}/api/category/`,
      { dept: dept },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
export const fetchAsyncCreateSkill = createAsyncThunk(
  "skill/createSkill",
  async (skill: POST_SKILL) => {
    const res = await axios.post<READ_SKILL>(
      `${process.env.REACT_APP_API_URL}/api/skills/`,
      skill,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
export const fetchAsyncUpdateSkill = createAsyncThunk(
  "skill/updateSkill",
  async (skill: POST_SKILL) => {
    const res = await axios.put<READ_SKILL>(
      `${process.env.REACT_APP_API_URL}/api/skills/${skill.id}/`,
      skill,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
export const fetchAsyncDeleteSkill = createAsyncThunk(
  "skill/deleteSkill",
  async (id: string) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/skills/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return id;
  }
);

export const initialState: SKILL_STATE = {
  skills: [
    {
      id: "",
      name: "",
      dept: 0,
      dept_name: "",
      career: "",
      infla: "",
      dev: "",
      speciality: "",
      myself: "",
      owner: 0,
      owner_username: "",
      created_at: "",
      updated_at: "",
    },
  ],
  editedSkill: {
    id: "",
    name: "",
    dept: 0,
    career: "",
    infla: "",
    dev: "",
    speciality: "",
    myself: "",
  },
  selectedSkill: {
    id: "",
    name: "",
    dept: 0,
    dept_name: "",
    career: "",
    infla: "",
    dev: "",
    speciality: "",
    myself: "",
    owner: 0,
    owner_username: "",
    created_at: "",
    updated_at: "",
  },
  users: [
    {
      id: 0,
      username: "",
    },
  ],
  category: [
    {
      id: 0,
      dept: "",
    },
  ],
};

export const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    editSkill(state, action: PayloadAction<POST_SKILL>) {
      state.editedSkill = action.payload;
    },
    selectSkill(state, action: PayloadAction<READ_SKILL>) {
      state.selectedSkill = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetSkills.fulfilled,
      (state, action: PayloadAction<READ_SKILL[]>) => {
        return {
          ...state,
          skills: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetSkills.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncGetUsers.fulfilled,
      (state, action: PayloadAction<USER[]>) => {
        return {
          ...state,
          users: action.payload,
        };
      }
    );
    builder.addCase(
      fetchAsyncGetCategory.fulfilled,
      (state, aciton: PayloadAction<CATEGORY[]>) => {
        return {
          ...state,
          category: aciton.payload,
        };
      }
    );
    builder.addCase(
      fetchAsyncCreateCategory.fulfilled,
      (state, action: PayloadAction<CATEGORY>) => {
        return {
          ...state,
          category: [...state.category, action.payload],
        };
      }
    );
    builder.addCase(fetchAsyncCreateCategory.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncCreateSkill.fulfilled,
      (state, action: PayloadAction<READ_SKILL>) => {
        return {
          ...state,
          skills: [action.payload, ...state.skills],
          editedSkill: initialState.editedSkill,
        };
      }
    );
    builder.addCase(fetchAsyncCreateSkill.rejected, () => {
      console.log("missed");
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncUpdateSkill.fulfilled,
      (state, action: PayloadAction<READ_SKILL>) => {
        return {
          ...state,
          skills: state.skills.map((s) =>
            s.id === action.payload.id ? action.payload : s
          ),
          editedSkill: initialState.editedSkill,
          selectedSkill: initialState.selectedSkill,
        };
      }
    );
    builder.addCase(fetchAsyncUpdateSkill.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncDeleteSkill.fulfilled,
      (state, action: PayloadAction<string>) => {
        return {
          ...state,
          skills: state.skills.filter((s) => s.id !== action.payload),
          editedSkill: initialState.editedSkill,
          selectedSkill: initialState.selectedSkill,
        };
      }
    );
    builder.addCase(fetchAsyncDeleteSkill.rejected, () => {
      window.location.href = "/";
    });
  },
});

export const { editSkill, selectSkill } = skillSlice.actions;

export const selectSkills = (state: RootState) => state.skill.skills;
export const selectEditedSkill = (state: RootState) => state.skill.editedSkill;
export const selectUsers = (state: RootState) => state.skill.users;
export const selectCategory = (state: RootState) => state.skill.category;
export const selectSelectedSkill = (state: RootState) =>
  state.skill.selectedSkill;

export default skillSlice.reducer;

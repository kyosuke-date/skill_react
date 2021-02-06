import dataJson from "./data.json";

export interface LOGIN_USER {
  id: number;
  username: string;
}

export interface JWT {
  refresh: string;
  access: string;
}

export interface CRED {
  username: string;
  password: string;
}

export interface USER {
  id: number;
  username: string;
}

export interface AUTH_STATE {
  isLoginView: boolean;
  loginUser: LOGIN_USER;
}

export interface CATEGORY {
  id: number;
  dept: string;
}

export interface POST_SKILL {
  id: string;
  name: string;
  dept: number;
  career: string;
  infla: string;
  dev: string;
  speciality: string;
  myself: string;
}

export type READ_SKILL = typeof dataJson;

export interface SKILL_STATE {
  skills: READ_SKILL[];
  editedSkill: POST_SKILL;
  selectedSkill: READ_SKILL;
  users: USER[];
  category: CATEGORY[];
}

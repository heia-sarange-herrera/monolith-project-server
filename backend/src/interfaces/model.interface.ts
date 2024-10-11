import { ROLES } from "../enums/ROLE_ENUMS";

export interface IUser {
  username: string;
  password: string;
  userData: {
    firstName: string,
    middleName?: string,
    lastName: string,
    address: {
      unit?: string,
      village?: string,
      city?: string,
      province?: string,
      zipCode?: string,
    },
    role: ROLES
  }
}

export interface IBook {
  title: string;
  author: string;
}

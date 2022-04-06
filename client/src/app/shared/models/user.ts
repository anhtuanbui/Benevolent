export interface IUser {
  isAuthenticated: boolean;
  userName: string;
  email: string;
  token: string;
}

export class User implements IUser {
  isAuthenticated = false;
  userName = '';
  email = '';
  token = '';
}

export interface UserCredentials {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

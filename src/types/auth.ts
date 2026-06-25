export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignupPayload = AuthCredentials & {
  username: string;
};

export type User = {
  _id: number;
  email: string;
  username: string;
};

export type SignupResponse = {
  message: string;
  result: User;
  success: boolean;
};

export type TokenResponse = {
  access: string;
  refresh: string;
};

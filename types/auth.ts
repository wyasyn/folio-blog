export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: User;
}

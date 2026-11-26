import { AppUser, AppUserAvatar } from "./appUser";

export type AuthContextType = {
  isAuthenticated: boolean | undefined;
  isLoading: boolean;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  appUser: AppUser | undefined;
  appUserAvatar: AppUserAvatar | null | undefined;
  changeAvatar: () => void;
  updateUserPassword: (
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
  ) => void;
};

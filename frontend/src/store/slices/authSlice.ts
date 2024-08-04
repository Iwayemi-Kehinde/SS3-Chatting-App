type UserInfo = {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  color?: number;
  profileSetup?: boolean;
};

export type AuthSlice = {
  userInfo: UserInfo | any;
  setUserInfo: (userInfo: UserInfo | any) => void;
};

export const createAuthSlice = (set: (partial: Partial<AuthSlice>) => void): AuthSlice => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});

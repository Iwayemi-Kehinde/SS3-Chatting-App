type UserInfo = {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  color?: number;
  profileSetup?: Boolean
};

export type AuthSlice = {
  userInfo: UserInfo | undefined;
  setUserInfo: (userInfo: UserInfo | undefined) => void;
};

export const createAuthSlice = (
  set: (partial: Partial<AuthSlice>) => void
): AuthSlice => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});

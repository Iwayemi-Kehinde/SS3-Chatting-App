import { create } from "zustand";


export interface AuthSlice {
  userInfo?: any;
  setUserInfo: (userInfo: any) => void;
}

export const useAppStore = create<AuthSlice>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
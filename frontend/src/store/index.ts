import { create } from "zustand";
import { createChatSlice } from "./slices/chat-slice";


export interface AuthSlice {
  userInfo?: any;
  setUserInfo: (userInfo: any) => void;
}

export const useAppStore = create<AuthSlice>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
  ...createChatSlice(...a)
}));
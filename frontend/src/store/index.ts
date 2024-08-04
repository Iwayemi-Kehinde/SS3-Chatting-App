import { create } from "zustand";
<<<<<<< HEAD
// import { createChatSlice } from "./slices/chat-slice";
=======
import { createChatSlice } from "./slices/chat-slice";
>>>>>>> 5dcd9f9c23dfa312d495664dca923511f330c984


export interface AuthSlice {
  userInfo?: any;
  setUserInfo: (userInfo: any) => void;
}

export const useAppStore = create<AuthSlice>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
<<<<<<< HEAD
  // ...createChatSlice(...a)
=======
  ...createChatSlice(...a)
>>>>>>> 5dcd9f9c23dfa312d495664dca923511f330c984
}));
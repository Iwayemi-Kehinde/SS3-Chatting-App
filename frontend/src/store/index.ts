import { create } from "zustand";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";
import { createChatSlice, ChatSlice } from "./slices/chat-slice";

export const useAppStore = create<AuthSlice & ChatSlice>((set, get) => ({
  ...createAuthSlice(set),
  ...createChatSlice(set, get),
}));

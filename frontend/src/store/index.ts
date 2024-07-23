import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices/authSlice";

export const useAppStore = create<AuthSlice>((set) => ({
  ...createAuthSlice(set),
}));

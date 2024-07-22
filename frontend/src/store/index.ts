import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices/authSlice";

// Combine slices and create the store
export const useAppStore = create<AuthSlice>((set) => ({
  ...createAuthSlice(set),
}));

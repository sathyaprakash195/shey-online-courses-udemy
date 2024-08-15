import { IUser } from "@/interfaces";
import { create } from "zustand";

const usersGlobalStore = create((set) => ({
  currentUserData: null,
  setCurrentUserData: (data: IUser) => set({ currentUserData: data }),
}));

export default usersGlobalStore;

export interface IUsersGlobalStore {
  currentUserData: IUser | null;
  setCurrentUserData: (data: IUser) => void;
}

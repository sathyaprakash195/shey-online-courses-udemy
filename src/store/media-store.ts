import { IMedia } from "@/interfaces";
import { create } from "zustand";

const mediaGlobalStore = create((set) => ({
  media: [],
  setMedia: (data: any) => set({ media: data }),
}));

export default mediaGlobalStore;

export interface IMediaGlobalStore {
  media: IMedia[];
  setMedia: (data: any) => void;
}

import { create } from "zustand";

type FontSize = {
  size: string;
  changeSize: (size: string) => void;
};

export const useFontSizeStore = create<FontSize>((set) => ({
  size: "16px",
  changeSize: (newSize: string) =>
    set(() => ({
      size: newSize,
    })),
}));

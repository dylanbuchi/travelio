import { create } from "zustand";

interface ModalStore {
  modalName: string;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const modalStore = (name: string) =>
  create<ModalStore>((set) => ({
    modalName: name,
    isOpen: false,
    openModal: () =>
      set({
        isOpen: true,
      }),
    closeModal: () =>
      set({
        isOpen: false,
      }),
  }));

export const loginModalStore = modalStore("login");
export const registerModalStore = modalStore("register");
export const rentModalStore = modalStore("rent");

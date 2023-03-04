import { create } from "zustand";

interface Secret {
  sharedKey: string;
  setSharedKey: (newSharedKey: string) => void;
}

const useSecretStore = create<Secret>()((set) => ({
  sharedKey: "",
  setSharedKey: (newSharedKey: string) => set({ sharedKey: newSharedKey }),
}));

export default useSecretStore;

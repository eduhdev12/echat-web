import { Buffer } from "buffer/";
import { create } from "zustand";

interface Secret {
  sharedKey: string;
  setSharedKey: (newSharedKey: string) => void;
  iv?: Uint8Array;
  setIV: (newBuffer: Uint8Array) => void;
}

const useSecretStore = create<Secret>()((set) => ({
  sharedKey: "",
  setSharedKey: (newSharedKey: string) => set({ sharedKey: newSharedKey }),
  iv: undefined,
  setIV: (newBuffer: Uint8Array) => set({ iv: newBuffer }),
}));

export default useSecretStore;

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: number;
  avatar: string;
  username: string;
  email: string;
  role: "USER" | "PREMIUM";
  token: string;
}

interface Session {
  data: User;
  setSession: (newSession: User) => void;
  logOut: () => void;
}

const useSessionStore = create<Session>()(
  devtools(
    persist(
      (set) => ({
        data: {} as User,
        setSession: (newSession: User) => set({ data: newSession }),
        logOut: () => set({ data: {} as User }),
      }),
      {
        name: "session-storage",
      }
    )
  )
);

export default useSessionStore;

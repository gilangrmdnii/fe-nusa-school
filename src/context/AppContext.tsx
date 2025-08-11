"use client";
import React, { createContext, useContext, useState } from "react";

type User = {
  name: string;
  role: string;
};

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    name: "Budi Santoso",
    role: "Admin"
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

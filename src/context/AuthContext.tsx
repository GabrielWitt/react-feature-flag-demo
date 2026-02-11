import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/feature";

type AuthContextType = {
  user: User | null;
  login: (role: "admin" | "user") => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: "admin" | "user") => {
    const mockUser: User = {
      id: role === "admin" ? 1 : 2,
      name: role === "admin" ? "Admin User" : "Customer User",
      role,
    };

    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};

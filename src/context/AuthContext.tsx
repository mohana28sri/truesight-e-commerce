import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("trustcart-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string) => {
    // Mock login
    const mockUser: User = {
      id: "1",
      name: email.split("@")[0],
      email,
      role: email.includes("admin") ? "admin" : "user",
    };
    setUser(mockUser);
    localStorage.setItem("trustcart-user", JSON.stringify(mockUser));
    return true;
  };

  const signup = (name: string, email: string, _password: string) => {
    const mockUser: User = { id: Date.now().toString(), name, email, role: "user" };
    setUser(mockUser);
    localStorage.setItem("trustcart-user", JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("trustcart-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

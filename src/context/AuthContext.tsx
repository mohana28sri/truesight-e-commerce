import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchApi } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists, then load user
    const token = localStorage.getItem("zenvique-token");
    if (token) {
      fetchApi("/auth/me")
        .then((data) => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem("zenvique-user", JSON.stringify(data.user));
          }
        })
        .catch(() => {
          localStorage.removeItem("zenvique-token");
          localStorage.removeItem("zenvique-user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setUser(data.user);
      localStorage.setItem("zenvique-user", JSON.stringify(data.user));
      localStorage.setItem("zenvique-token", data.token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await fetchApi("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setUser(data.user);
      localStorage.setItem("zenvique-user", JSON.stringify(data.user));
      localStorage.setItem("zenvique-token", data.token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zenvique-user");
    localStorage.removeItem("zenvique-token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

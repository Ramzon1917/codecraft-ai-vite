import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  oauthLogin: (provider: string) => Promise<void>;
}

const defaultUser: User = {
  id: "user-123",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  role: "user",
  subscription: {
    plan: "pro",
    status: "active",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  oauthLogin: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - in a real app, this would call an API
    console.log("Login attempt with:", { email, password });

    // For demo purposes, any login attempt succeeds with the default user
    setUser(defaultUser);
    setIsAuthenticated(true);
    localStorage.setItem("mockUser", JSON.stringify(defaultUser));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in a real app, this would call an API
    console.log("Signup attempt with:", { name, email, password });

    // Create a new user based on the default but with the provided name and email
    const newUser = {
      ...defaultUser,
      name,
      email,
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("mockUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("mockUser");
  };

  const oauthLogin = async (provider: string) => {
    // Mock OAuth login - in a real app, this would redirect to the provider
    console.log(`OAuth login with ${provider}`);

    // For demo purposes, any OAuth login succeeds with the default user
    setUser(defaultUser);
    setIsAuthenticated(true);
    localStorage.setItem("mockUser", JSON.stringify(defaultUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        oauthLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

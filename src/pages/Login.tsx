import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthenticationPanel from "@/components/auth/AuthenticationPanel";

const Login = () => {
  const navigate = useNavigate();
  const { login, signup, oauthLogin, isAuthenticated } = useAuth();

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleAuthenticated = () => {
    navigate("/dashboard");
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      handleAuthenticated();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await signup(values.name, values.email, values.password);
      handleAuthenticated();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    try {
      await oauthLogin(provider);
      handleAuthenticated();
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to AppGen
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>

        <AuthenticationPanel
          onAuthenticated={handleAuthenticated}
          defaultTab="login"
        />
      </div>
    </div>
  );
};

export default Login;

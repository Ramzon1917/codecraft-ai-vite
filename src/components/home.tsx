import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./layout/Navbar";
import AuthenticationPanel from "./auth/AuthenticationPanel";
import HeroSection from "./landing/HeroSection";
import FeatureShowcase from "./landing/FeatureShowcase";
import PricingPlans from "./landing/PricingPlans";
import PromptSubmissionForm from "./dashboard/PromptSubmissionForm";
import ProjectsList from "./dashboard/ProjectsList";
import SubscriptionStatus from "./dashboard/SubscriptionStatus";
import UserProfileCard from "./dashboard/UserProfileCard";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isAuthenticated={isAuthenticated}
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
      />

      <main className="pt-16">
        {" "}
        {/* Add padding to account for fixed navbar */}
        {isAuthenticated ? (
          <AuthenticatedView onLogout={handleLogout} />
        ) : (
          <UnauthenticatedView onAuthenticated={handleAuthentication} />
        )}
      </main>
    </div>
  );
};

const UnauthenticatedView = ({
  onAuthenticated,
}: {
  onAuthenticated: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        onPrimaryClick={() => {
          // Scroll to authentication panel
          document
            .getElementById("auth-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        onSecondaryClick={() => {
          // Scroll to features section
          document
            .getElementById("features-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <div id="features-section">
        <FeatureShowcase />
      </div>

      <div id="pricing-section">
        <PricingPlans />
      </div>

      <div id="auth-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Get Started Today
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create your account and start building amazing applications with
              AI
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <AuthenticationPanel onAuthenticated={onAuthenticated} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AuthenticatedView = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <UserProfileCard
            onLogout={onLogout}
            user={{
              name: "John Doe",
              email: "john.doe@example.com",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
              company: "Acme Inc.",
              role: "Developer",
              plan: "Pro",
            }}
          />
          <SubscriptionStatus />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground">
              Create new AI-powered applications or manage your existing
              projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 text-primary p-2 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-zap"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                Quick Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Deployed</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 text-primary p-2 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-activity"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </span>
                Recent Activity
              </h2>
              <ul className="space-y-3">
                <li className="text-sm border-b pb-2">
                  <span className="font-medium">E-commerce Platform</span> was
                  deployed successfully
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </li>
                <li className="text-sm border-b pb-2">
                  <span className="font-medium">Task Management App</span>{" "}
                  generation started
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </li>
                <li className="text-sm border-b pb-2">
                  <span className="font-medium">Blog Platform</span> code was
                  updated
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Weather Dashboard</span>{" "}
                  generation failed
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </li>
              </ul>
            </div>
          </div>

          <PromptSubmissionForm
            onSubmit={(values) => {
              console.log("Form submitted:", values);
              // Here you would typically send the data to your backend
            }}
          />

          <ProjectsList />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;

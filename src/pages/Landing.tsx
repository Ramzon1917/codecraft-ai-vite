import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import PricingPlans from "@/components/landing/PricingPlans";
import AuthenticationPanel from "@/components/auth/AuthenticationPanel";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleAuthentication = () => {
    navigate("/dashboard");
  };

  const handleHeroPrimaryClick = () => {
    // Scroll to authentication panel if not authenticated, otherwise go to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      document
        .getElementById("auth-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHeroSecondaryClick = () => {
    // Scroll to features section
    document
      .getElementById("features-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isAuthenticated={isAuthenticated}
        userName={user?.name || ""}
        userAvatar={user?.avatar}
      />

      <main className="pt-16">
        <HeroSection
          onPrimaryClick={handleHeroPrimaryClick}
          onSecondaryClick={handleHeroSecondaryClick}
        />

        <div id="features-section">
          <FeatureShowcase />
        </div>

        <div id="pricing-section">
          <PricingPlans />
        </div>

        {!isAuthenticated && (
          <div id="auth-section" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  Get Started Today
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Create your account and start building amazing applications
                  with AI
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <AuthenticationPanel onAuthenticated={handleAuthentication} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Landing;

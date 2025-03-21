import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Code, Settings, LayoutDashboard, Zap } from "lucide-react";
import UserProfileCard from "@/components/dashboard/UserProfileCard";
import SubscriptionStatus from "@/components/dashboard/SubscriptionStatus";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

const DashboardLayout = ({
  children,
  activeTab = "overview",
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Zap className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">AppGen</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/generate/new")}
              className="hidden sm:flex items-center"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
            <UserProfileCard
              user={{
                name: user?.name || "User",
                email: user?.email || "user@example.com",
                avatar: user?.avatar,
                company: "Acme Inc.",
                role: "Developer",
                plan:
                  user?.subscription.plan === "pro"
                    ? "Pro"
                    : user?.subscription.plan === "enterprise"
                      ? "Enterprise"
                      : "Free",
              }}
              onLogout={logout}
              onUpdateProfile={(data) => console.log("Profile updated", data)}
              compact={true}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Navigation</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <Button
                      variant={activeTab === "overview" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => navigate("/dashboard")}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant={activeTab === "projects" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => navigate("/projects")}
                    >
                      <Code className="mr-2 h-4 w-4" />
                      My Projects
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant={activeTab === "settings" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => navigate("/settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>

            <SubscriptionStatus
              currentPlan={{
                name:
                  user?.subscription.plan === "pro"
                    ? "Pro"
                    : user?.subscription.plan === "enterprise"
                      ? "Enterprise"
                      : "Free",
                description:
                  user?.subscription.plan === "pro"
                    ? "For professional developers and small teams"
                    : user?.subscription.plan === "enterprise"
                      ? "For large teams and organizations"
                      : "For individual developers",
                features: [
                  {
                    name: "Unlimited projects",
                    included: user?.subscription.plan !== "free",
                  },
                  {
                    name: "Priority support",
                    included: user?.subscription.plan !== "free",
                  },
                  {
                    name: "Custom deployment options",
                    included: user?.subscription.plan !== "free",
                  },
                  {
                    name: "Team collaboration",
                    included: user?.subscription.plan === "enterprise",
                  },
                  {
                    name: "Enterprise integrations",
                    included: user?.subscription.plan === "enterprise",
                  },
                ],
                usageLimit:
                  user?.subscription.plan === "free"
                    ? 3
                    : user?.subscription.plan === "pro"
                      ? 50
                      : 100,
                currentUsage: 2,
              }}
              onUpgrade={() => console.log("Upgrade clicked")}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { useState } from "react";
import { Repository, Deployment } from "@/types";

interface UseProjectManagementProps {
  projectId?: string;
  projectName?: string;
  repository?: Repository;
  deployments?: Deployment[];
}

export const useProjectManagement = ({
  projectId = "proj-123456",
  projectName = "E-commerce Platform",
  repository = {
    name: "e-commerce-platform",
    url: "https://github.com/username/e-commerce-platform",
    branch: "main",
    lastCommit: "2023-06-15T10:30:00Z",
    status: "synced",
  },
  deployments = [
    {
      environment: "Development",
      status: "deployed",
      url: "https://dev-ecommerce.example.com",
      lastDeployed: "2023-06-15T11:30:00Z",
    },
    {
      environment: "Staging",
      status: "deployed",
      url: "https://staging-ecommerce.example.com",
      lastDeployed: "2023-06-14T15:45:00Z",
    },
    {
      environment: "Production",
      status: "pending",
      url: "https://ecommerce.example.com",
      lastDeployed: "2023-06-10T09:15:00Z",
    },
  ],
}: UseProjectManagementProps) => {
  const [activeTab, setActiveTab] = useState("repository");
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(true);
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] =
    useState(true);

  return {
    projectId,
    projectName,
    repository,
    deployments,
    activeTab,
    setActiveTab,
    isDeployDialogOpen,
    setIsDeployDialogOpen,
    isCustomizationDialogOpen,
    setIsCustomizationDialogOpen,
  };
};

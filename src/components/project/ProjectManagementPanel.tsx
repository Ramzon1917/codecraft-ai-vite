import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CloudIcon, CodeIcon, GitBranchIcon, SettingsIcon } from "lucide-react";

// Import custom hooks
import { useProjectManagement } from "./hooks/useProjectManagement";

// Import components
import RepositoryInfo from "./components/RepositoryInfo";
import CommitHistory from "./components/CommitHistory";
import DeploymentEnvironments from "./components/DeploymentEnvironments";
import CustomizationOptions from "./components/CustomizationOptions";
import CodeCustomization from "./components/CodeCustomization";

// Import types
import { Repository, Deployment } from "@/types";

interface ProjectManagementPanelProps {
  projectId?: string;
  projectName?: string;
  repository?: Repository;
  deployments?: Deployment[];
}

const ProjectManagementPanel = (props: ProjectManagementPanelProps) => {
  const {
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
  } = useProjectManagement(props);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{projectName}</h1>
          <p className="text-muted-foreground">Project ID: {projectId}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <CodeIcon size={16} />
            View Code
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <CloudIcon size={16} />
            Deploy
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="repository" className="flex items-center gap-1">
            <GitBranchIcon size={16} />
            Repository
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center gap-1">
            <CloudIcon size={16} />
            Deployment
          </TabsTrigger>
          <TabsTrigger
            value="customization"
            className="flex items-center gap-1"
          >
            <SettingsIcon size={16} />
            Customization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="repository" className="space-y-4 mt-6">
          <RepositoryInfo repository={repository} />
          <CommitHistory />
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4 mt-6">
          <DeploymentEnvironments
            deployments={deployments}
            isDeployDialogOpen={isDeployDialogOpen}
            setIsDeployDialogOpen={setIsDeployDialogOpen}
          />
        </TabsContent>

        <TabsContent value="customization" className="space-y-4 mt-6">
          <CustomizationOptions
            isCustomizationDialogOpen={isCustomizationDialogOpen}
            setIsCustomizationDialogOpen={setIsCustomizationDialogOpen}
          />
          <CodeCustomization />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagementPanel;

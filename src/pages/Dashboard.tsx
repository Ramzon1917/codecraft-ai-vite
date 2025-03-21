import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useProjects } from "@/context/ProjectContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectsList from "@/components/dashboard/ProjectsList";
import PromptSubmissionForm from "@/components/dashboard/PromptSubmissionForm";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Activity } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { projects, deleteProject } = useProjects();
  const navigate = useNavigate();

  const handleViewProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/project/${projectId}/edit`);
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
    }
  };

  const handleDeployProject = (projectId: string) => {
    navigate(`/project/${projectId}/deploy`);
  };

  const handleViewCode = (projectId: string) => {
    navigate(`/generate/${projectId}`);
  };

  const handlePromptSubmit = (values: any) => {
    console.log("Form submitted:", values);
    // In a real app, this would create a new project and redirect to the generation page
    navigate("/generate/new");
  };

  return (
    <DashboardLayout activeTab="overview">
      <div className="space-y-8">
        <Card className="bg-white shadow-sm border">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground">
              Create new AI-powered applications or manage your existing
              projects.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm border">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 text-primary p-2 rounded-full mr-2">
                  <Zap className="h-5 w-5" />
                </span>
                Quick Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Deployed</p>
                  <p className="text-2xl font-bold">
                    {
                      projects.filter((p) =>
                        p.deployments?.some((d) => d.status === "deployed"),
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">
                    {
                      projects.filter(
                        (p) => !p.deployments || p.deployments.length === 0,
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold">
                    {
                      projects.filter((p) =>
                        p.deployments?.some((d) => d.status === "failed"),
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 text-primary p-2 rounded-full mr-2">
                  <Activity className="h-5 w-5" />
                </span>
                Recent Activity
              </h2>
              <ul className="space-y-3">
                {projects.slice(0, 4).map((project, index) => (
                  <li key={project.id} className="text-sm border-b pb-2">
                    <span className="font-medium">{project.name}</span>{" "}
                    {index === 0
                      ? "was deployed successfully"
                      : index === 1
                        ? "generation started"
                        : index === 2
                          ? "code was updated"
                          : "generation failed"}
                    <p className="text-xs text-muted-foreground">
                      {index === 0
                        ? "2 hours ago"
                        : index === 1
                          ? "5 hours ago"
                          : index === 2
                            ? "Yesterday"
                            : "2 days ago"}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <PromptSubmissionForm onSubmit={handlePromptSubmit} />

        <ProjectsList
          projects={projects}
          onViewProject={handleViewProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          onDeployProject={handleDeployProject}
          onViewCode={handleViewCode}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

export default Dashboard;

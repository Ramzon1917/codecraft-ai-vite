import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "@/context/ProjectContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PromptSubmissionForm from "@/components/dashboard/PromptSubmissionForm";
import GenerationProgress from "@/components/generation/GenerationProgress";
import CodePreview from "@/components/generation/CodePreview";
import ProjectDetails from "@/components/generation/ProjectDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const GenerationPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject, addProject } = useProjects();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"generating" | "completed" | "failed">("generating");
  const [activeTab, setActiveTab] = useState("frontend");

  // If projectId is "new", show the form to create a new project
  const isNewProject = projectId === "new";
  const project = !isNewProject && projectId ? getProject(projectId) : undefined;

  useEffect(() => {
    if (!project || isNewProject) return;

    // Simulate code generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("completed");
          return 100;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [project, isNewProject]);

  const handlePromptSubmit = (values: any) => {
    console.log("Form submitted:", values);

    // Create a new project with the form values
    const newProject = {
      name:
        values.projectType === "ecommerce"
          ? "E-commerce Platform"
          : values.projectType === "web"
            ? "Web Application"
            : values.projectType === "mobile"
              ? "Mobile Application"
              : values.projectType === "desktop"
                ? "Desktop Application"
                : "API Service",
      description: values.description,
      technologies: [
        values.techStack.frontend,
        values.techStack.backend,
        values.techStack.database,
      ],
      features: values.features,
    };

    addProject(newProject);

    // Redirect to the generation page for the new project
    navigate(`/generate/1`); // In a real app, this would be the ID of the newly created project
  };

  const handleApproveCode = () => {
    if (projectId) {
      navigate(`/project/${projectId}`);
    }
  };

  const handleRequestChanges = () => {
    setStatus("generating");
    setProgress(30); // Reset progress to simulate regeneration
  };

  if (isNewProject) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
          <PromptSubmissionForm onSubmit={handlePromptSubmit} />
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Status Panel */}
        <div className="lg:col-span-3 space-y-4">
          <GenerationProgress 
            progress={progress} 
            status={status} 
            onApprove={handleApproveCode}
            onRegenerate={handleRequestChanges}
          />
          <ProjectDetails project={project} />
        </div>

        {/* Code Preview */

export default GenerationPage;

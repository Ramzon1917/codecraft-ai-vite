import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Code,
  Play,
  Edit,
  Trash2,
  Github,
  ExternalLink,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "generating" | "completed" | "deployed" | "failed";
  createdAt: string;
  technologies: string[];
  lastUpdated: string;
  deploymentUrl?: string;
  repositoryUrl?: string;
}

interface ProjectsListProps {
  projects?: Project[];
  onViewProject?: (projectId: string) => void;
  onEditProject?: (projectId: string) => void;
  onDeleteProject?: (projectId: string) => void;
  onDeployProject?: (projectId: string) => void;
  onViewCode?: (projectId: string) => void;
}

const ProjectsList = ({
  projects = [
    {
      id: "1",
      name: "E-commerce Platform",
      description:
        "A full-stack e-commerce application with product catalog, shopping cart, and payment processing.",
      status: "completed",
      createdAt: "2023-06-15T10:30:00Z",
      technologies: ["React", "Node.js", "MongoDB"],
      lastUpdated: "2023-06-18T14:45:00Z",
      repositoryUrl: "https://github.com/user/ecommerce-app",
    },
    {
      id: "2",
      name: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team workspaces.",
      status: "generating",
      createdAt: "2023-06-20T09:15:00Z",
      technologies: ["React", "Express", "PostgreSQL"],
      lastUpdated: "2023-06-20T09:15:00Z",
    },
    {
      id: "3",
      name: "Blog Platform",
      description:
        "A content management system for creating and publishing blog posts with user authentication.",
      status: "deployed",
      createdAt: "2023-06-10T11:20:00Z",
      technologies: ["React", "Firebase", "Tailwind"],
      lastUpdated: "2023-06-12T16:30:00Z",
      deploymentUrl: "https://blog-platform-demo.netlify.app",
      repositoryUrl: "https://github.com/user/blog-platform",
    },
    {
      id: "4",
      name: "Weather Dashboard",
      description:
        "A weather forecasting application with location-based data and interactive visualizations.",
      status: "failed",
      createdAt: "2023-06-05T13:45:00Z",
      technologies: ["React", "Express", "OpenWeatherAPI"],
      lastUpdated: "2023-06-05T15:20:00Z",
    },
  ],
  onViewProject = () => {},
  onEditProject = () => {},
  onDeleteProject = () => {},
  onDeployProject = () => {},
  onViewCode = () => {},
}: ProjectsListProps) => {
  const getStatusBadgeVariant = (status: Project["status"]) => {
    switch (status) {
      case "generating":
        return "secondary";
      case "completed":
        return "default";
      case "deployed":
        return "default";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "generating":
        return "Generating";
      case "completed":
        return "Completed";
      case "deployed":
        return "Deployed";
      case "failed":
        return "Failed";
      default:
        return status;
    }
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Projects</h2>
        <Button>Create New Project</Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first AI-generated project to get started
          </p>
          <Button>Create New Project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <Badge variant={getStatusBadgeVariant(project.status)}>
                    {getStatusText(project.status)}
                  </Badge>
                </div>
                <CardDescription className="mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    Last updated:{" "}
                    {new Date(project.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 justify-between border-t pt-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewProject(project.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewCode(project.id)}
                  >
                    <Code className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </div>
                <div className="flex gap-2">
                  {project.status === "completed" && (
                    <Button
                      size="sm"
                      onClick={() => onDeployProject(project.id)}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Deploy
                    </Button>
                  )}
                  {project.status === "deployed" && project.deploymentUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      as="a"
                      href={project.deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit
                    </Button>
                  )}
                  {project.repositoryUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      as="a"
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Repo
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditProject(project.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;

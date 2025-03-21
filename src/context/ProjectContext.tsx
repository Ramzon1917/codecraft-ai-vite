import { createContext, useContext, useState } from "react";
import { Project } from "@/types";

interface ProjectContextType {
  projects: Project[];
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

// Mock projects data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description:
      "A full-stack e-commerce application with product catalog, shopping cart, and payment processing.",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-18T14:45:00Z",
    technologies: ["React", "Node.js", "MongoDB"],
    features: ["auth", "payment", "admin"],
    repository: {
      name: "ecommerce-app",
      url: "https://github.com/user/ecommerce-app",
      branch: "main",
      lastCommit: "2023-06-18T14:45:00Z",
      status: "synced",
    },
    deployments: [
      {
        environment: "production",
        status: "deployed",
        url: "https://ecommerce-app-demo.netlify.app",
        lastDeployed: "2023-06-18T15:30:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team workspaces.",
    createdAt: "2023-06-20T09:15:00Z",
    updatedAt: "2023-06-20T09:15:00Z",
    technologies: ["React", "Express", "PostgreSQL"],
    features: ["auth", "realtime", "notifications"],
  },
  {
    id: "3",
    name: "Blog Platform",
    description:
      "A content management system for creating and publishing blog posts with user authentication.",
    createdAt: "2023-06-10T11:20:00Z",
    updatedAt: "2023-06-12T16:30:00Z",
    technologies: ["React", "Firebase", "Tailwind"],
    features: ["auth", "fileUpload", "search"],
    repository: {
      name: "blog-platform",
      url: "https://github.com/user/blog-platform",
      branch: "main",
      lastCommit: "2023-06-12T16:30:00Z",
      status: "synced",
    },
    deployments: [
      {
        environment: "production",
        status: "deployed",
        url: "https://blog-platform-demo.netlify.app",
        lastDeployed: "2023-06-12T17:15:00Z",
      },
    ],
  },
  {
    id: "4",
    name: "Weather Dashboard",
    description:
      "A weather forecasting application with location-based data and interactive visualizations.",
    createdAt: "2023-06-05T13:45:00Z",
    updatedAt: "2023-06-05T15:20:00Z",
    technologies: ["React", "Express", "OpenWeatherAPI"],
    features: ["search", "darkMode"],
  },
];

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  addProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
  getProject: () => undefined,
});

export function useProjects() {
  return useContext(ProjectContext);
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const addProject = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date().toISOString() }
          : project,
      ),
    );
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const getProject = (id: string) => {
    return projects.find((project) => project.id === id);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        getProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

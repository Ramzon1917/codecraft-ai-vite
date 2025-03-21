// Common types used across the application

export interface Repository {
  name: string;
  url: string;
  branch: string;
  lastCommit: string;
  status: "synced" | "pending" | "error";
}

export interface Deployment {
  environment: string;
  status: "deployed" | "pending" | "failed";
  url: string;
  lastDeployed: string;
}

export interface Project {
  id: string;
  name: string;
  repository?: Repository;
  deployments?: Deployment[];
  createdAt: string;
  updatedAt: string;
  description?: string;
  technologies: string[];
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
  subscription: {
    plan: "free" | "pro" | "enterprise";
    status: "active" | "inactive" | "trial";
    expiresAt?: string;
  };
}

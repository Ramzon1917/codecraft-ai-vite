import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  GitBranchIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  CloudIcon,
  SettingsIcon,
  CodeIcon,
  PackageIcon,
  TerminalIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  RefreshCwIcon,
} from "lucide-react";

interface Repository {
  name: string;
  url: string;
  branch: string;
  lastCommit: string;
  status: "synced" | "pending" | "error";
}

interface Deployment {
  environment: string;
  status: "deployed" | "pending" | "failed";
  url: string;
  lastDeployed: string;
}

interface ProjectManagementPanelProps {
  projectId?: string;
  projectName?: string;
  repository?: Repository;
  deployments?: Deployment[];
}

const ProjectManagementPanel = ({
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
}: ProjectManagementPanelProps) => {
  const [activeTab, setActiveTab] = useState("repository");
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(true);
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] =
    useState(true);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "synced":
      case "deployed":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircleIcon size={12} /> {status}
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <RefreshCwIcon size={12} className="animate-spin" /> {status}
          </Badge>
        );
      case "error":
      case "failed":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircleIcon size={12} /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

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
          <Card>
            <CardHeader>
              <CardTitle>Repository Information</CardTitle>
              <CardDescription>
                Manage your project's code repository
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Repository Name</label>
                  <div className="flex items-center mt-1">
                    <Input value={repository.name} readOnly />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Repository URL</label>
                  <div className="flex items-center mt-1">
                    <Input value={repository.url} readOnly />
                    <Button variant="ghost" size="sm" className="ml-2">
                      <GitBranchIcon size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Branch</label>
                  <div className="flex items-center mt-1">
                    <Select defaultValue={repository.branch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">main</SelectItem>
                        <SelectItem value="develop">develop</SelectItem>
                        <SelectItem value="feature/auth">
                          feature/auth
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex items-center mt-3">
                    {getStatusBadge(repository.status)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      Last commit:{" "}
                      {new Date(repository.lastCommit).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-1">
                <RefreshCwIcon size={16} />
                Sync Repository
              </Button>
              <Button className="flex items-center gap-1">
                <GitPullRequestIcon size={16} />
                Create Pull Request
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commit History</CardTitle>
              <CardDescription>
                Recent commits to your repository
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 pb-3 border-b last:border-0"
                  >
                    <GitCommitIcon
                      size={20}
                      className="mt-1 text-muted-foreground"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">
                          Update user authentication flow
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {i} day{i > 1 ? "s" : ""} ago
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Commit by John Doe
                      </p>
                      <p className="text-xs font-mono mt-1">
                        a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="mx-auto">
                View All Commits
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Environments</CardTitle>
              <CardDescription>Manage your project deployments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deployments.map((deployment, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {deployment.environment}
                        </h3>
                        {getStatusBadge(deployment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last deployed:{" "}
                        {new Date(deployment.lastDeployed).toLocaleString()}
                      </p>
                      <a
                        href={deployment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline mt-1 inline-block"
                      >
                        {deployment.url}
                      </a>
                    </div>
                    <div className="flex gap-2 mt-3 md:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <RefreshCwIcon size={14} />
                        Redeploy
                      </Button>
                      <Button size="sm" className="flex items-center gap-1">
                        <TerminalIcon size={14} />
                        Logs
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Dialog
                open={isDeployDialogOpen}
                onOpenChange={setIsDeployDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <CloudIcon size={16} />
                    Deploy to New Environment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deploy to New Environment</DialogTitle>
                    <DialogDescription>
                      Configure deployment settings for your new environment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Environment Name
                      </label>
                      <Input placeholder="e.g., Production, Staging, QA" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Deployment Provider
                      </label>
                      <Select defaultValue="aws">
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aws">AWS</SelectItem>
                          <SelectItem value="gcp">Google Cloud</SelectItem>
                          <SelectItem value="azure">Azure</SelectItem>
                          <SelectItem value="vercel">Vercel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Branch to Deploy
                      </label>
                      <Select defaultValue="main">
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">main</SelectItem>
                          <SelectItem value="develop">develop</SelectItem>
                          <SelectItem value="feature/auth">
                            feature/auth
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-deploy" />
                      <label
                        htmlFor="auto-deploy"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Enable auto-deployment on commit
                      </label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeployDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button>Deploy</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="customization" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
              <CardDescription>
                Modify your generated application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Technology Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["React", "Node.js", "MongoDB", "Express"].map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center p-3 border rounded-lg"
                      >
                        <PackageIcon size={18} className="mr-2 text-blue-500" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Project Features</h3>
                  <div className="space-y-2">
                    {[
                      "User Authentication",
                      "Product Management",
                      "Shopping Cart",
                      "Payment Processing",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <span>{feature}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog
                open={isCustomizationDialogOpen}
                onOpenChange={setIsCustomizationDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <SettingsIcon size={16} />
                    Add Custom Feature
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Custom Feature</DialogTitle>
                    <DialogDescription>
                      Describe the custom feature you want to add to your
                      application.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Feature Name
                      </label>
                      <Input placeholder="e.g., Analytics Dashboard" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Feature Description
                      </label>
                      <Textarea
                        placeholder="Describe what this feature should do and any specific requirements..."
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Technology Requirements
                      </label>
                      <Select defaultValue="none">
                        <SelectTrigger>
                          <SelectValue placeholder="Select technology" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">
                            No specific requirement
                          </SelectItem>
                          <SelectItem value="react">
                            React Components
                          </SelectItem>
                          <SelectItem value="node">Node.js Backend</SelectItem>
                          <SelectItem value="database">
                            Database Changes
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="priority-feature" />
                      <label
                        htmlFor="priority-feature"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Mark as priority feature
                      </label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCustomizationDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button>Add Feature</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Customization</CardTitle>
              <CardDescription>Directly modify generated code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Frontend Components</h3>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="bg-gray-800 text-gray-200 p-3 rounded font-mono text-xs overflow-x-auto">
                    <pre>{`import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>$\{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;`}</pre>
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Backend API Routes</h3>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="bg-gray-800 text-gray-200 p-3 rounded font-mono text-xs overflow-x-auto">
                    <pre>{`const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Discard Changes</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagementPanel;

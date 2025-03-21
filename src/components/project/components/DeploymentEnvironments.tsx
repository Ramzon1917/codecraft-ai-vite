import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CloudIcon, RefreshCwIcon, TerminalIcon } from "lucide-react";
import { Deployment } from "@/types";

interface DeploymentEnvironmentsProps {
  deployments: Deployment[];
  isDeployDialogOpen?: boolean;
  setIsDeployDialogOpen?: (open: boolean) => void;
}

const DeploymentEnvironments = ({
  deployments,
  isDeployDialogOpen = true,
  setIsDeployDialogOpen = () => {},
}: DeploymentEnvironmentsProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "deployed":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            {status}
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            {status}
          </span>
        );
      case "failed":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
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
                  <h3 className="font-medium">{deployment.environment}</h3>
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
        <Dialog open={isDeployDialogOpen} onOpenChange={setIsDeployDialogOpen}>
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
                <label className="text-sm font-medium">Environment Name</label>
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
                <label className="text-sm font-medium">Branch to Deploy</label>
                <Select defaultValue="main">
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main</SelectItem>
                    <SelectItem value="develop">develop</SelectItem>
                    <SelectItem value="feature/auth">feature/auth</SelectItem>
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
  );
};

export default DeploymentEnvironments;

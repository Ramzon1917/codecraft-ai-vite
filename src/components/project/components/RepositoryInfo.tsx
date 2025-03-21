import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  GitBranchIcon,
  GitPullRequestIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Repository } from "@/types";

interface RepositoryInfoProps {
  repository: Repository;
}

const RepositoryInfo = ({ repository }: RepositoryInfoProps) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Repository Information</CardTitle>
        <CardDescription>Manage your project's code repository</CardDescription>
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
                  <SelectItem value="feature/auth">feature/auth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <div className="flex items-center mt-3">
              {getStatusBadge(repository.status)}
              <span className="ml-2 text-sm text-muted-foreground">
                Last commit: {new Date(repository.lastCommit).toLocaleString()}
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
  );
};

export default RepositoryInfo;

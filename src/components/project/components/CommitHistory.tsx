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
import { GitCommitIcon } from "lucide-react";

interface Commit {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  hash: string;
}

interface CommitHistoryProps {
  commits?: Commit[];
}

const CommitHistory = ({ commits }: CommitHistoryProps) => {
  // Default mock data if no commits provided
  const displayCommits = commits || [
    {
      id: "1",
      message: "Update user authentication flow",
      author: "John Doe",
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    },
    {
      id: "2",
      message: "Update user authentication flow",
      author: "John Doe",
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      hash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7",
    },
    {
      id: "3",
      message: "Update user authentication flow",
      author: "John Doe",
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      hash: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8",
    },
  ];

  const getDaysAgo = (timestamp: string) => {
    const now = new Date();
    const commitDate = new Date(timestamp);
    const diffTime = Math.abs(now.getTime() - commitDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commit History</CardTitle>
        <CardDescription>Recent commits to your repository</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayCommits.map((commit) => {
            const daysAgo = getDaysAgo(commit.timestamp);
            return (
              <div
                key={commit.id}
                className="flex items-start gap-3 pb-3 border-b last:border-0"
              >
                <GitCommitIcon
                  size={20}
                  className="mt-1 text-muted-foreground"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{commit.message}</p>
                    <span className="text-xs text-muted-foreground">
                      {daysAgo} day{daysAgo > 1 ? "s" : ""} ago
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Commit by {commit.author}
                  </p>
                  <p className="text-xs font-mono mt-1">{commit.hash}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="mx-auto">
          View All Commits
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommitHistory;

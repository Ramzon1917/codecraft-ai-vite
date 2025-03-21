import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface GenerationProgressProps {
  progress: number;
  status: "generating" | "completed" | "failed";
  onApprove?: () => void;
  onRegenerate?: () => void;
  onCancel?: () => void;
}

const GenerationProgress = ({
  progress = 0,
  status = "generating",
  onApprove = () => {},
  onRegenerate = () => {},
  onCancel = () => {},
}: GenerationProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation Status</CardTitle>
        <CardDescription>
          {status === "generating"
            ? "Your code is being generated"
            : status === "completed"
              ? "Code generation complete"
              : "Generation failed"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              {progress >= 20 ? (
                <Check className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
              )}
              <span className="text-sm">Analyzing requirements</span>
            </div>
            <div className="flex items-center">
              {progress >= 40 ? (
                <Check className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
              )}
              <span className="text-sm">Generating frontend code</span>
            </div>
            <div className="flex items-center">
              {progress >= 60 ? (
                <Check className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
              )}
              <span className="text-sm">Generating backend code</span>
            </div>
            <div className="flex items-center">
              {progress >= 80 ? (
                <Check className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
              )}
              <span className="text-sm">Setting up database</span>
            </div>
            <div className="flex items-center">
              {progress >= 100 ? (
                <Check className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
              )}
              <span className="text-sm">Finalizing project</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        {status === "completed" ? (
          <>
            <Button variant="outline" size="sm" onClick={onRegenerate}>
              <X className="mr-2 h-4 w-4" /> Request Changes
            </Button>
            <Button size="sm" onClick={onApprove}>
              <Check className="mr-2 h-4 w-4" /> Approve Code
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={status === "generating"}
            onClick={onCancel}
          >
            Cancel Generation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GenerationProgress;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Created</h4>
            <p className="text-sm text-muted-foreground">
              {new Date(project.createdAt).toLocaleString()}
            </p>
          </div>
          {project.updatedAt !== project.createdAt && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Last Updated</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(project.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetails;

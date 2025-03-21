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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PackageIcon, SettingsIcon } from "lucide-react";

interface CustomizationOptionsProps {
  technologies?: string[];
  features?: string[];
  isCustomizationDialogOpen?: boolean;
  setIsCustomizationDialogOpen?: (open: boolean) => void;
}

const CustomizationOptions = ({
  technologies = ["React", "Node.js", "MongoDB", "Express"],
  features = [
    "User Authentication",
    "Product Management",
    "Shopping Cart",
    "Payment Processing",
  ],
  isCustomizationDialogOpen = true,
  setIsCustomizationDialogOpen = () => {},
}: CustomizationOptionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customization Options</CardTitle>
        <CardDescription>Modify your generated application</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Technology Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {technologies.map((tech) => (
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
              {features.map((feature) => (
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
                Describe the custom feature you want to add to your application.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Feature Name</label>
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
                    <SelectItem value="react">React Components</SelectItem>
                    <SelectItem value="node">Node.js Backend</SelectItem>
                    <SelectItem value="database">Database Changes</SelectItem>
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
  );
};

export default CustomizationOptions;

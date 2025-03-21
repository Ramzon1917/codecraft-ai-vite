import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Code,
  Server,
  Database,
  Layers,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const formSchema = z.object({
  projectType: z.string({
    required_error: "Please select a project type.",
  }),
  features: z.array(z.string()).nonempty({
    message: "Please select at least one feature.",
  }),
  techStack: z.object({
    frontend: z.string({
      required_error: "Please select a frontend framework.",
    }),
    backend: z.string({
      required_error: "Please select a backend framework.",
    }),
    database: z.string({
      required_error: "Please select a database.",
    }),
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface PromptSubmissionFormProps {
  onSubmit?: (values: FormValues) => void;
}

const PromptSubmissionForm = ({
  onSubmit = () => {},
}: PromptSubmissionFormProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "projectType",
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: "",
      features: [],
      techStack: {
        frontend: "",
        backend: "",
        database: "",
      },
      description: "",
    },
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
    // In a real implementation, this would send the data to the backend
    console.log(values);
  };

  const projectTypes = [
    { value: "web", label: "Web Application" },
    { value: "mobile", label: "Mobile Application" },
    { value: "desktop", label: "Desktop Application" },
    { value: "api", label: "API Service" },
    { value: "ecommerce", label: "E-Commerce Platform" },
  ];

  const featureOptions = [
    { id: "auth", label: "Authentication System" },
    { id: "payment", label: "Payment Processing" },
    { id: "admin", label: "Admin Dashboard" },
    { id: "analytics", label: "Analytics" },
    { id: "notifications", label: "Notifications" },
    { id: "fileUpload", label: "File Upload" },
    { id: "search", label: "Search Functionality" },
    { id: "realtime", label: "Real-time Updates" },
    { id: "multilingual", label: "Multi-language Support" },
    { id: "darkMode", label: "Dark Mode" },
  ];

  const frontendOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" },
  ];

  const backendOptions = [
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python (Django/Flask)" },
    { value: "java", label: "Java (Spring)" },
    { value: "ruby", label: "Ruby on Rails" },
    { value: "php", label: "PHP (Laravel)" },
  ];

  const databaseOptions = [
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "firebase", label: "Firebase" },
    { value: "supabase", label: "Supabase" },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create Your Application
        </CardTitle>
        <CardDescription className="text-center">
          Describe your project and we'll generate the code for you using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Project Type Section */}
            <div className="rounded-lg border p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left font-medium"
                onClick={() => toggleSection("projectType")}
              >
                <div className="flex items-center space-x-3">
                  <Layers className="h-5 w-5 text-primary" />
                  <span>Project Type</span>
                </div>
                {expandedSection === "projectType" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {expandedSection === "projectType" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Project Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the type of application you want to build.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </div>

            {/* Features Section */}
            <div className="rounded-lg border p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left font-medium"
                onClick={() => toggleSection("features")}
              >
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-primary" />
                  <span>Features</span>
                </div>
                {expandedSection === "features" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {expandedSection === "features" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <FormField
                    control={form.control}
                    name="features"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Select Features</FormLabel>
                          <FormDescription>
                            Choose the features you want to include in your
                            application.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {featureOptions.map((feature) => (
                            <FormField
                              key={feature.id}
                              control={form.control}
                              name="features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={feature.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          feature.id,
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                feature.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== feature.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {feature.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </div>

            {/* Tech Stack Section */}
            <div className="rounded-lg border p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left font-medium"
                onClick={() => toggleSection("techStack")}
              >
                <div className="flex items-center space-x-3">
                  <Server className="h-5 w-5 text-primary" />
                  <span>Technology Stack</span>
                </div>
                {expandedSection === "techStack" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {expandedSection === "techStack" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="techStack.frontend"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frontend Framework</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a frontend framework" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {frontendOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="techStack.backend"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Backend Framework</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a backend framework" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {backendOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="techStack.database"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Database</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a database" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {databaseOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </div>

            {/* Project Description Section */}
            <div className="rounded-lg border p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left font-medium"
                onClick={() => toggleSection("description")}
              >
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-primary" />
                  <span>Project Description</span>
                </div>
                {expandedSection === "description" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {expandedSection === "description" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project in detail. Include specific requirements, user flows, and any other important information."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The more detailed your description, the better the
                          generated code will match your requirements.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </div>

            <CardFooter className="flex justify-end px-0">
              <Button type="submit" className="w-full sm:w-auto" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Generate Application
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PromptSubmissionForm;

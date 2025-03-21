import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Code,
  Cpu,
  Database,
  GitBranch,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon = <Sparkles />,
  title = "Feature Title",
  description = "Feature description goes here.",
}: FeatureCardProps) => {
  return (
    <Card className="bg-white h-full flex flex-col transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

interface FeatureShowcaseProps {
  features?: FeatureCardProps[];
  title?: string;
  subtitle?: string;
}

const FeatureShowcase = ({
  features = [
    {
      icon: <Code size={24} />,
      title: "AI Code Generation",
      description:
        "Transform your ideas into complete, deployable applications with our advanced AI code generation technology.",
    },
    {
      icon: <Cpu size={24} />,
      title: "Full-Stack Support",
      description:
        "Generate frontend, backend, and database code all from a single prompt with intelligent architecture decisions.",
    },
    {
      icon: <GitBranch size={24} />,
      title: "Version Control Integration",
      description:
        "Automatically push generated code to GitHub repositories with proper commit history and documentation.",
    },
    {
      icon: <Rocket size={24} />,
      title: "One-Click Deployment",
      description:
        "Deploy your generated applications to the cloud with automated CI/CD pipelines and infrastructure setup.",
    },
    {
      icon: <Zap size={24} />,
      title: "Real-Time Generation",
      description:
        "Watch your application come to life in real-time with our interactive code generation interface.",
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Authentication",
      description:
        "Every generated application includes robust authentication and authorization systems built-in.",
    },
    {
      icon: <Database size={24} />,
      title: "Database Management",
      description:
        "Automatically create optimized database schemas and migrations based on your application requirements.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "AI-Powered Testing",
      description:
        "Generate comprehensive test suites to ensure your application works flawlessly from day one.",
    },
  ],
  title = "Powerful Features",
  subtitle = "Our AI-powered platform transforms your ideas into production-ready applications with these powerful capabilities.",
}: FeatureShowcaseProps) => {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="rounded-full px-8 py-6 h-auto text-base font-medium"
          >
            Start Building Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;

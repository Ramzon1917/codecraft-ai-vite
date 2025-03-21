import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Cpu, Database, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection = ({
  title = "Transform Ideas into Software with AI",
  subtitle = "Our AI-powered platform turns your project descriptions into complete, deployable applications in minutes. No coding required.",
  ctaPrimary = "Get Started",
  ctaSecondary = "View Demo",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
}: HeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full bg-gradient-to-b from-background to-background/80 py-20 px-4 md:px-8 lg:px-12">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex-1 space-y-8" variants={itemVariants}>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            variants={itemVariants}
          >
            <Button
              size="lg"
              onClick={onPrimaryClick}
              className="text-base font-semibold"
            >
              {ctaPrimary} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onSecondaryClick}
              className="text-base font-semibold"
            >
              {ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className="flex-1 relative" variants={itemVariants}>
          <div className="relative w-full max-w-lg mx-auto">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  AI Code Generator
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Frontend</span>
                  </div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Backend</span>
                  </div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Database</span>
                  </div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                <div className="flex justify-end">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                    <Rocket className="h-4 w-4" />
                    <span>Generating application...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;

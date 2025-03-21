import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { ArrowUpRight, Check, Zap } from "lucide-react";

interface SubscriptionFeature {
  name: string;
  included: boolean;
}

interface SubscriptionPlan {
  name: string;
  description: string;
  features: SubscriptionFeature[];
  usageLimit: number;
  currentUsage: number;
}

interface SubscriptionStatusProps {
  currentPlan?: SubscriptionPlan;
  isLoading?: boolean;
  onUpgrade?: () => void;
}

const SubscriptionStatus = ({
  currentPlan = {
    name: "Pro",
    description: "For professional developers and small teams",
    features: [
      { name: "Unlimited projects", included: true },
      { name: "Priority support", included: true },
      { name: "Custom deployment options", included: true },
      { name: "Team collaboration", included: false },
      { name: "Enterprise integrations", included: false },
    ],
    usageLimit: 50,
    currentUsage: 32,
  },
  isLoading = false,
  onUpgrade = () => console.log("Upgrade clicked"),
}: SubscriptionStatusProps) => {
  const usagePercentage = Math.round(
    (currentPlan.currentUsage / currentPlan.usageLimit) * 100,
  );

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              {currentPlan.name} Plan
            </CardTitle>
            <CardDescription className="mt-1">
              {currentPlan.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <Zap className="mr-1 h-3 w-3" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Usage this month</span>
              <span className="text-sm font-medium">
                {currentPlan.currentUsage}/{currentPlan.usageLimit} projects
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {currentPlan.usageLimit - currentPlan.currentUsage} projects
              remaining this month
            </p>
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-semibold mb-3">Plan Features</h4>
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  {feature.included ? (
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <span className="mr-2 h-4 w-4 flex items-center justify-center text-gray-300">
                      -
                    </span>
                  )}
                  <span className={feature.included ? "" : "text-gray-400"}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm">
          Billing History
        </Button>
        <Button onClick={onUpgrade} size="sm" className="gap-1">
          Upgrade Plan
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionStatus;

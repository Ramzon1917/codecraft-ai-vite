import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  billingPeriod: string;
  features: PlanFeature[];
  popularPlan?: boolean;
  buttonText: string;
}

interface PricingPlansProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: "$19",
    billingPeriod: "per month",
    buttonText: "Get Started",
    features: [
      { name: "Up to 3 projects", included: true },
      { name: "Basic code generation", included: true },
      { name: "Frontend components only", included: true },
      { name: "GitHub repository integration", included: false },
      { name: "Deployment assistance", included: false },
      { name: "Advanced AI features", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For professional developers and teams",
    price: "$49",
    billingPeriod: "per month",
    buttonText: "Upgrade to Pro",
    popularPlan: true,
    features: [
      { name: "Up to 10 projects", included: true },
      { name: "Full-stack code generation", included: true },
      { name: "Frontend & backend components", included: true },
      { name: "GitHub repository integration", included: true },
      { name: "Deployment assistance", included: true },
      { name: "Advanced AI features", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "For large teams and organizations",
    price: "$99",
    billingPeriod: "per month",
    buttonText: "Contact Sales",
    features: [
      { name: "Unlimited projects", included: true },
      { name: "Full-stack code generation", included: true },
      { name: "Frontend & backend components", included: true },
      { name: "GitHub repository integration", included: true },
      { name: "Deployment assistance", included: true },
      { name: "Advanced AI features", included: true },
      { name: "Priority support", included: true },
    ],
  },
];

const PricingPlans: React.FC<PricingPlansProps> = ({
  title = "Pricing Plans",
  subtitle = "Choose the perfect plan for your needs",
  plans = defaultPlans,
}) => {
  return (
    <div className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col h-full",
                plan.popularPlan && "border-primary shadow-lg relative",
              )}
            >
              {plan.popularPlan && (
                <Badge
                  className="absolute -top-2 right-4 px-3 py-1"
                  variant="default"
                >
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">
                    {plan.billingPeriod}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          !feature.included && "text-muted-foreground",
                        )}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popularPlan ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;

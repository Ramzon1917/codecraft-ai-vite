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

interface CodeSnippet {
  title: string;
  code: string;
}

interface CodeCustomizationProps {
  codeSnippets?: CodeSnippet[];
}

const CodeCustomization = ({
  codeSnippets = [
    {
      title: "Frontend Components",
      code: `import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>$\{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;`,
    },
    {
      title: "Backend API Routes",
      code: `const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;`,
    },
  ],
}: CodeCustomizationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Customization</CardTitle>
        <CardDescription>Directly modify generated code</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {codeSnippets.map((snippet, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{snippet.title}</h3>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="bg-gray-800 text-gray-200 p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{snippet.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Discard Changes</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default CodeCustomization;

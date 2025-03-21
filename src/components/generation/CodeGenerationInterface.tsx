import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "@/context/ProjectContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Check,
  Code,
  Database,
  Layout,
  Server,
  X,
} from "lucide-react";

const CodeGenerationInterface = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject } = useProjects();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"generating" | "completed" | "failed">(
    "generating",
  );
  const [activeTab, setActiveTab] = useState("frontend");

  const project = projectId ? getProject(projectId) : undefined;

  useEffect(() => {
    if (!project) return;

    // Simulate code generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("completed");
          return 100;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [project]);

  if (!project) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="mb-6">The project you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const handleApproveCode = () => {
    if (projectId) {
      navigate(`/project/${projectId}`);
    }
  };

  const handleRequestChanges = () => {
    setStatus("generating");
    setProgress(30); // Reset progress to simulate regeneration
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Status Panel */}
        <div className="lg:col-span-3 space-y-4">
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
                    {progress >= 30 ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
                    )}
                    <span className="text-sm">Analyzing requirements</span>
                  </div>
                  <div className="flex items-center">
                    {progress >= 50 ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
                    )}
                    <span className="text-sm">Generating frontend code</span>
                  </div>
                  <div className="flex items-center">
                    {progress >= 70 ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
                    )}
                    <span className="text-sm">Generating backend code</span>
                  </div>
                  <div className="flex items-center">
                    {progress >= 90 ? (
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRequestChanges}
                  >
                    <X className="mr-2 h-4 w-4" /> Request Changes
                  </Button>
                  <Button size="sm" onClick={handleApproveCode}>
                    <Check className="mr-2 h-4 w-4" /> Approve Code
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={status === "generating"}
                >
                  Cancel Generation
                </Button>
              )}
            </CardFooter>
          </Card>

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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Code Preview */}
        <div className="lg:col-span-9">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Generated Code</CardTitle>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="frontend" className="flex items-center">
                      <Layout className="mr-2 h-4 w-4" />
                      Frontend
                    </TabsTrigger>
                    <TabsTrigger value="backend" className="flex items-center">
                      <Server className="mr-2 h-4 w-4" />
                      Backend
                    </TabsTrigger>
                    <TabsTrigger value="database" className="flex items-center">
                      <Database className="mr-2 h-4 w-4" />
                      Database
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden">
              <TabsContent value="frontend" className="m-0">
                <div className="bg-gray-100 p-4 h-[600px] overflow-auto">
                  <pre className="text-sm">
                    <code>
                      {`// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

// components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between">
          <Link to={\`/products/\${product.id}\`} className="text-blue-600 text-sm hover:underline">
            View Details
          </Link>
          <button 
            onClick={() => addToCart(product)} 
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;`}
                    </code>
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="backend" className="m-0">
                <div className="bg-gray-100 p-4 h-[600px] overflow-auto">
                  <pre className="text-sm">
                    <code>
                      {`// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));

// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);`}
                    </code>
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="database" className="m-0">
                <div className="bg-gray-100 p-4 h-[600px] overflow-auto">
                  <pre className="text-sm">
                    <code>
                      {`// Database Schema

// Products Collection
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "price": Number,
  "image": String,
  "category": String,
  "countInStock": Number,
  "rating": Number,
  "numReviews": Number,
  "createdAt": Date
}

// Users Collection
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String, // Hashed
  "isAdmin": Boolean,
  "createdAt": Date,
  "address": {
    "street": String,
    "city": String,
    "postalCode": String,
    "country": String
  }
}

// Orders Collection
{
  "_id": ObjectId,
  "user": { type: ObjectId, ref: 'User' },
  "orderItems": [
    {
      "name": String,
      "qty": Number,
      "image": String,
      "price": Number,
      "product": { type: ObjectId, ref: 'Product' }
    }
  ],
  "shippingAddress": {
    "address": String,
    "city": String,
    "postalCode": String,
    "country": String
  },
  "paymentMethod": String,
  "paymentResult": {
    "id": String,
    "status": String,
    "update_time": String,
    "email_address": String
  },
  "taxPrice": Number,
  "shippingPrice": Number,
  "totalPrice": Number,
  "isPaid": Boolean,
  "paidAt": Date,
  "isDelivered": Boolean,
  "deliveredAt": Date,
  "createdAt": Date
}

// Sample Database Queries

// Get all products
db.products.find({})

// Get products by category
db.products.find({ category: "Electronics" })

// Get products with price less than $100
db.products.find({ price: { $lt: 100 } })

// Get a user's orders
db.orders.find({ user: ObjectId("userId") })

// Get paid orders
db.orders.find({ isPaid: true })

// Get orders with total price greater than $50
db.orders.find({ totalPrice: { $gt: 50 } })`}
                    </code>
                  </pre>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerationInterface;

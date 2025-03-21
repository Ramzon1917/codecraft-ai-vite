import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Server, Database } from "lucide-react";

interface CodePreviewProps {
  frontendCode?: string;
  backendCode?: string;
  databaseCode?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const CodePreview = ({
  frontendCode = `// App.tsx
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

export default App;`,
  backendCode = `// server.js
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

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
  databaseCode = `// Database Schema

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
}`,
  activeTab = "frontend",
  onTabChange = () => {},
}: CodePreviewProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Generated Code</CardTitle>
          <Tabs
            value={activeTab}
            onValueChange={onTabChange}
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
              <code>{frontendCode}</code>
            </pre>
          </div>
        </TabsContent>
        <TabsContent value="backend" className="m-0">
          <div className="bg-gray-100 p-4 h-[600px] overflow-auto">
            <pre className="text-sm">
              <code>{backendCode}</code>
            </pre>
          </div>
        </TabsContent>
        <TabsContent value="database" className="m-0">
          <div className="bg-gray-100 p-4 h-[600px] overflow-auto">
            <pre className="text-sm">
              <code>{databaseCode}</code>
            </pre>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default CodePreview;

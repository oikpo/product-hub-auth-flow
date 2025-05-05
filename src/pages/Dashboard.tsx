
import React, { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ProductList from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, Package } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  // Redirect if not authenticated
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>

        <DashboardStats />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link to="/products/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Register New Product
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/products">
                  <Package className="mr-2 h-4 w-4" />
                  View All Products
                </Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Info</h2>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Name</span>
                <p>{user?.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Email</span>
                <p>{user?.email}</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recently Added Products</h2>
          <ProductList />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

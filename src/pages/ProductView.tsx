
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import ProductDetail from '@/components/products/ProductDetail';

const ProductView = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
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
      <ProductDetail />
    </Layout>
  );
};

export default ProductView;

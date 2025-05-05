
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import SignupForm from '@/components/auth/SignupForm';

const Signup = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;

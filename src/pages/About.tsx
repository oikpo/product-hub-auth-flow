
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About ProductHub</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              ProductHub provides a simple, user-friendly platform for businesses to manage 
              their product inventory. Our mission is to make product registration and 
              management accessible to everyone, from small businesses to large enterprises.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Simple user authentication</li>
              <li>Easy product registration with image upload</li>
              <li>Comprehensive product management</li>
              <li>Intuitive dashboard for monitoring inventory</li>
              <li>Secure data storage with MySQL</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Frontend:</strong> React with TypeScript, Tailwind CSS</li>
              <li><strong>UI Components:</strong> shadcn/ui</li>
              <li><strong>Backend:</strong> Node.js with Express</li>
              <li><strong>Database:</strong> MySQL</li>
              <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
              <li><strong>Form Handling:</strong> React Hook Form with Zod validation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;

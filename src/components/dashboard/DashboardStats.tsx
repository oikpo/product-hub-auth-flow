
import React from 'react';
import { useProducts } from '@/contexts/ProductContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, DollarSign, Calendar } from 'lucide-react';

const DashboardStats = () => {
  const { products } = useProducts();
  
  // Calculate total product value
  const totalValue = products.reduce((sum, product) => {
    return sum + (product.price || 0);
  }, 0);
  
  // Get latest product
  const latestProduct = products.length > 0 
    ? products.reduce((latest, product) => {
        return new Date(product.created_at) > new Date(latest.created_at) ? product : latest;
      }, products[0])
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{products.length}</div>
          <p className="text-xs text-muted-foreground">
            Total registered products
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Combined value of all products
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Addition</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold line-clamp-1">
            {latestProduct ? latestProduct.name : 'No products'}
          </div>
          <p className="text-xs text-muted-foreground">
            {latestProduct 
              ? `Added ${new Date(latestProduct.created_at).toLocaleDateString()}`
              : 'Add your first product'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;


import React, { useEffect } from 'react';
import { useProducts } from '@/contexts/ProductContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Package, PlusCircle } from 'lucide-react';

const ProductList = () => {
  const { products, isLoading, fetchProducts } = useProducts();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Package className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No products found</h3>
        <p className="mt-2 text-sm text-gray-500">Get started by creating your first product.</p>
        <Button asChild className="mt-6">
          <Link to="/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <Button asChild>
          <Link to="/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card className="h-full transition-all hover:shadow-md">
              {product.image_url ? (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={`http://localhost:5000${product.image_url}`}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  {product.price && (
                    <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                  )}
                </div>
                {product.sku && (
                  <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                )}
              </CardHeader>
              
              <CardContent>
                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                )}
              </CardContent>
              
              <CardFooter className="pt-0">
                <p className="text-xs text-gray-400 mt-2">
                  Added {formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Package, ArrowLeft, PencilLine } from 'lucide-react';

interface ProductParams {
  id: string;
  [key: string]: string;
}

const ProductDetail = () => {
  const { id } = useParams<ProductParams>();
  const { getProduct, products, fetchProducts, isLoading } = useProducts();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProduct = async () => {
      // First check if we have the product in context
      const existingProduct = getProduct(parseInt(id || '0'));
      
      if (existingProduct) {
        setProduct(existingProduct);
      } else {
        // If not, fetch all products and try again
        await fetchProducts();
        const refetchedProduct = getProduct(parseInt(id || '0'));
        
        if (refetchedProduct) {
          setProduct(refetchedProduct);
        } else {
          // If still not found, redirect to products
          navigate('/products');
        }
      }
    };

    fetchProduct();
  }, [id, token, products.length]);

  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/products')} className="pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image_url ? (
            <div className="rounded-lg overflow-hidden border">
              <img
                src={`http://localhost:5000${product.image_url}`}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden border bg-gray-100 aspect-square flex items-center justify-center">
              <Package className="h-24 w-24 text-gray-400" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {product.price && (
              <p className="text-2xl font-medium mt-2">${product.price.toFixed(2)}</p>
            )}
          </div>

          {product.sku && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">SKU</h3>
              <p>{product.sku}</p>
            </div>
          )}

          {product.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 whitespace-pre-wrap">{product.description}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-500">Created</h3>
            <p>{new Date(product.created_at).toLocaleDateString()} ({formatDistanceToNow(new Date(product.created_at), { addSuffix: true })})</p>
          </div>

          <div className="pt-4">
            <Button className="w-full md:w-auto">
              <PencilLine className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

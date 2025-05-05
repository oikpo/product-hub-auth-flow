
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  sku: string | null;
  created_at: string;
}

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  registerProduct: (formData: FormData) => Promise<void>;
  getProduct: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { token, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch products when component mounts or when auth status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    } else {
      // Clear products when user logs out
      setProducts([]);
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      setProducts(data.products);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred while fetching products');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const registerProduct = async (formData: FormData) => {
    if (!token) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register product');
      }

      // Add new product to state and refetch all products
      await fetchProducts();
      toast.success('Product registered successfully!');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred while registering product');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = (id: number) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error,
        fetchProducts,
        registerProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
};

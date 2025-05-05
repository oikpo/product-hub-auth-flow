
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ImagePlus } from 'lucide-react';

// Define form schema
const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  sku: z.string().optional(),
  image: z.instanceof(FileList).optional()
    .transform(fileList => fileList?.item(0) || undefined)
    .refine(
      file => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
      'Image must be less than 5MB'
    ),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductForm = () => {
  const { registerProduct } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: undefined,
      sku: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create and set image preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Create form data to send
      const formData = new FormData();
      formData.append('name', values.name);
      
      if (values.description) {
        formData.append('description', values.description);
      }
      
      if (values.price !== undefined) {
        formData.append('price', String(values.price));
      }
      
      if (values.sku) {
        formData.append('sku', values.sku);
      }
      
      if (values.image) {
        formData.append('image', values.image);
      }

      await registerProduct(formData);
      navigate('/products');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Register New Product</CardTitle>
        <CardDescription>
          Add details about your new product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="0.01"
                        placeholder="0.00" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Product SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter product description" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center">
                      {previewUrl ? (
                        <div className="mb-4">
                          <img 
                            src={previewUrl} 
                            alt="Product preview" 
                            className="w-full max-w-[200px] h-auto rounded-md" 
                          />
                        </div>
                      ) : (
                        <div className="mb-4 border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center bg-gray-50">
                          <ImagePlus className="h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">Upload product image</p>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        className="max-w-sm"
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleImageChange(e);
                        }}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering Product...
                </>
              ) : (
                'Register Product'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;


import { axiosInstance } from '@/services/api';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

type Product = {
  id: string;
  name: string;
  price: number;
  advantages: {
    id: string;
    description: string;
  }[];
  active: boolean;
};

export function useAllProducts() {
  const { data: allProducts = [], refetch } = useQuery(
    'all-products',
    fetchAllProducts,
  );

  async function fetchAllProducts(): Promise<Product[]> {
    try {
      const { status, data } = await axiosInstance({
        url: 'products',
        method: 'get',
      });

      if (status !== 200) {
        throw new Error('Error fetching products');
      }

      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async function updateProduct(id: string, overrides: Partial<Product>) {
    try {
      const { status, data } = await axiosInstance({
        url: `products/${id}`,
        method: 'patch',
        data: overrides,
      });

      if (status !== 200) {
        if (data.errors) {
          for (const error of data.errors) {
            toast.error(error.message);
          }
        }

        return;
      }

      await refetch();

      toast.success('Product updated successfully');
    } catch (e) {
      console.log(e);
      toast.error('Error updating product');
    }
  }

  return {
    allProducts,
    updateProduct,
  };
}

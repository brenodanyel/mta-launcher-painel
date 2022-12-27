import { axiosInstance } from '@/services/api';
import { useQuery } from 'react-query';

export function useAllProducts() {
  const { data: allProducts = [] } = useQuery('all-products', fetchAllProducts);

  async function fetchAllProducts() {
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

  return {
    allProducts,
  };
}

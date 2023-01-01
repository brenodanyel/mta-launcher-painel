import { axiosInstance } from '@/services/api';
import { useQuery } from 'react-query';
import { User } from '@/types';

export function useUsers() {
  const { data: users = [] } = useQuery<User[]>('users', fetchUsers);

  async function fetchUsers(): Promise<User[]> {
    try {
      const { status, data } = await axiosInstance<User[]>({
        url: '/users',
        method: 'GET',
      });

      if (status !== 200) {
        throw new Error('Error fetching users');
      }

      return data;
    }
    catch (e) {
      console.log(e);
      return [];
    }
  }

  return {
    users,
  };
}
import { axiosInstance } from '@/services/api';

type ServerProfile = {
  id: string;
  ip: string;
  port: number;
  description: string;
  logo: string;
  externalLinks: { name: string; url: string; }[];
  active: boolean;
  createdAt: string;
  removedAt: string | null;
  ownerId: string;
};

export function useMyProducts() {
  async function fetchMyServerProfiles(): Promise<ServerProfile[]> {
    try {
      const { status, data } = await axiosInstance({
        url: '/server-profile/me',
        method: 'GET',
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
    fetchMyServerProfiles,
  };
}
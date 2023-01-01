import { useState } from 'react';
import { axiosInstance } from '@/services/api';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useProductDialogStore } from '../components/product-dialog/product-dialog.store';

export type ServerProfile = {
  id: string;
  ip: string;
  port: number;
  description: string;
  logo: string;
  externalLinks: { id: string; name: string; url: string; }[];
  active: boolean;
  createdAt: string;
  removeAt: Date | null;
  ownerId: string;
  owner: {
    id: string;
    email: string;
    username: string;
  };
};

export function useMyProducts() {
  const productDialogStore = useProductDialogStore();
  const { data: serverProfiles = [], refetch } = useQuery(
    'my-products',
    fetchMyServerProfiles,
  );

  const [isLoading, setLoading] = useState(false);

  async function fetchMyServerProfiles(): Promise<ServerProfile[]> {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }

  async function updateServerProfile(
    id: string,
    overrides: {
      ip?: string;
      port?: string;
      description?: string;
      logoBlob?: Blob;
      externalLinks?: { id: string; name: string; url: string; }[];
      active?: boolean;
      ownerId?: string;
      removeAt?: Date | null;
    },
  ) {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('ip', overrides.ip ?? '');
      formData.append('port', overrides.port ?? '');
      formData.append('description', overrides.description ?? '');
      if (overrides.logoBlob) {
        formData.append('logo', overrides.logoBlob);
      }
      formData.append(
        'externalLinks',
        JSON.stringify(overrides.externalLinks ?? []),
      );
      formData.append('active', overrides.active ? 'true' : 'false');
      formData.append('ownerId', overrides.ownerId ?? '');
      formData.append('removeAt', overrides.removeAt?.toISOString() ?? '');

      const { status, data } = await axiosInstance({
        url: `/server-profile/${id}`,
        method: 'PATCH',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (status !== 200) {
        if (data.errors) {
          for (const error of data.errors) {
            toast.error(error.message);
          }
          return;
        }
        throw new Error('Error updating server profile');
      }

      await refetch();

      productDialogStore.setOpen(false);
      toast.success('Server profile updated successfully');
    } finally {
      setLoading(false);
    }
  }


  async function deleteServerProfile(id: string) {
    try {
      setLoading(true);

      const { status, data } = await axiosInstance({
        url: `/server-profile/${id}`,
        method: 'delete',
      });

      if (status !== 200) {
        if (data.errors) {
          for (const error of data.errors) {
            toast.error(error.message);
          }
          return;
        }
        throw new Error('Error deleting server profile');
      }

      await refetch();

      productDialogStore.setOpen(false);
      toast.success('Server profile deleted successfully');
    } finally {
      setLoading(false);
    }
  }

  return {
    serverProfiles,
    isLoading,
    fetchMyServerProfiles,
    updateServerProfile,
    deleteServerProfile,
  };
}

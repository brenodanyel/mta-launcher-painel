import toast from 'react-hot-toast';
import { useState } from 'react';
import {
  useNavigate,
  useLocation,
  useSearchParams,
  matchPath,
} from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { axiosInstance } from '@/services/api';

export function useAuth() {
  const { user, setUser, clearUser, token, setToken, clearToken } =
    useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [search] = useSearchParams();

  const [isLoading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);

      const { status, data } = await axiosInstance({
        url: '/auth/signIn',
        method: 'post',
        data: { email, password },
      });

      if (status !== 200) {
        if (data.errors) {
          for (const error of data.errors) {
            toast.error(error.message);
          }
          return;
        }
        throw new Error('Falha ao efetuar login');
      }

      setToken(data.token);

      navigate(search.get('redirect_url') || '/');

      axiosInstance.defaults.headers.authorization = data.token;

      toast.success('Logged in successfully');
    } catch (e: any) {
      toast.error(e.message ?? 'Unknown Error');
    } finally {
      setLoading(false);
    }
  }

  async function signUp(username: string, email: string, password: string) {
    try {
      setLoading(true);

      const { status, data } = await axiosInstance({
        url: '/auth/signUp',
        method: 'post',
        data: { username, email, password },
      });

      if (status !== 201) {
        if (data.errors) {
          for (const error of data.errors) {
            toast.error(error.message);
          }
          return;
        }

        throw new Error('Failed to sign up');
      }

      setToken(data.token);

      navigate(search.get('redirect_url') || '/');

      axiosInstance.defaults.headers.authorization = data.token;

      toast.success('Logged in successfully');
    } catch (e: any) {
      toast.error(e.message ?? 'Unknown Error');
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    clearUser();
    clearToken();
    navigate('/login');
  }

  async function validate() {
    if (!token) {
      const url =
        location.pathname !== '/'
          ? `/login?redirect_url=${location.pathname + location.search}`
          : '/login';
      navigate(url);
      return;
    }

    try {
      setLoading(true);

      const { status, data } = await axiosInstance({
        url: '/auth/verify',
        method: 'get',
        headers: {
          authorization: String(token),
        },
      });

      if (status !== 200) {
        if (data.errors) {
          for (const error of data.errors) {
            toast.error(error.message);
          }
        }
        throw new Error('Failed to validate token');
      }

      setUser(data);

      axiosInstance.defaults.headers.authorization = token;
    } catch (e: any) {
      toast.error(e.message ?? 'Unknown Error');
      signOut();
    } finally {
      setLoading(false);
    }
  }

  function hasRole(slug: string | string[]): boolean {
    if (Array.isArray(slug)) return slug.some((s) => hasRole(s));
    return !!user?.roles?.some((role) => role.slug === slug);
  }

  function canAccessPath(checkPath: string) {
    const protectedRoles = {
      '/companies/*': ['super_admin'],
      '/users/*': ['super_admin', 'admin'],
    };

    for (const [path, roles] of Object.entries(protectedRoles)) {
      if (matchPath(path, checkPath)) {
        return roles.some((role) => hasRole(role));
      }
    }

    return true;
  }

  return {
    isLoading,
    user,
    token,
    signIn,
    signUp,
    signOut,
    validate,
    hasRole,
    canAccessPath,
  };
}

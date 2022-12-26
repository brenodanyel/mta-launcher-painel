import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';

type AuthWrapperProps = {
  children: JSX.Element;
};

export function AuthWrapper(props: AuthWrapperProps) {
  const { children } = props;
  const { token, validate, user, canAccessPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    validate();
  }, [location.pathname]);

  useEffect(() => {
    if (!user?.id) return;

    if (!canAccessPath(location.pathname)) {
      toast.error('Você não tem permissão para acessar esta página.');
      navigate('/');
      return;
    }

    setChecked(true);
  }, [location.pathname, user?.id]);

  if (!checked) {
    return null;
  }

  if (!token) {
    return <Navigate to='/login' />;
  }

  return children;
}

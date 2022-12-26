import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import { Register } from '@/pages/register';
import { Login } from '@/pages/login';
import { App } from '@/pages/app';
import { MyProducts } from '@/pages/app/my-products';
import { AllProducts } from '@/pages/app/all-products';
import { AuthWrapper } from './auth.wrapper';

export function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path=''
          element={
            <AuthWrapper>
              <App />
            </AuthWrapper>
          }
        >
          <Route path='' element={<MyProducts />} />
          <Route path='all-products' element={<AllProducts />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

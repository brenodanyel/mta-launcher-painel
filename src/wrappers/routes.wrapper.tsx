import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from '@/pages/register';
import { Login } from '@/pages/login';
import { App } from '@/pages/app';
import { MyProducts } from '@/pages/app/outlets/my-products';

export function RoutersWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='' element={<App />}>
          <Route path='my-products' element={<MyProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

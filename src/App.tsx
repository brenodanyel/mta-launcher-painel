import { Toaster } from 'react-hot-toast';
import { MUIWrapper } from '@/wrappers/mui.wrapper';
import { ReactQueryWrapper } from '@/wrappers/react-query.wrapper';
import { Routes } from '@/wrappers/routes.wrapper';

export function App() {
  return (
    <>
      <MUIWrapper>
        <ReactQueryWrapper>
          <Routes />
        </ReactQueryWrapper>
      </MUIWrapper>
      <Toaster position='top-right' />
    </>
  );
}

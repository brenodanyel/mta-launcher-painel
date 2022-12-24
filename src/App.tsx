import { Toaster } from 'react-hot-toast';
import { MUIWrapper } from '@/wrappers/mui.wrapper';
import { RoutersWrapper } from '@/wrappers/routes.wrapper';

export function App() {
  return (
    <MUIWrapper>
      <RoutersWrapper />
      <Toaster position='top-right' />
    </MUIWrapper>
  );
}

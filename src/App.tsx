import { Toaster } from 'react-hot-toast';
import { MUIWrapper } from '@/wrappers/mui.wrapper';
import { ReactQueryWrapper } from '@/wrappers/react-query.wrapper';
import { ConfirmProvider } from 'material-ui-confirm';
import { Routes } from '@/wrappers/routes.wrapper';
import { DateTimePickerProvider } from './wrappers/date-time-picker.wrapper';

export function App() {
  return (
    <>
      <MUIWrapper>
        <ReactQueryWrapper>
          <ConfirmProvider>
            <DateTimePickerProvider>
              <Routes />
            </DateTimePickerProvider>
          </ConfirmProvider>
        </ReactQueryWrapper>
      </MUIWrapper>
      <Toaster position='top-right' />
    </>
  );
}

import { ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

type DateTimePickerProviderProps = {
  children: ReactNode;
};

export function DateTimePickerProvider(props: DateTimePickerProviderProps) {
  const { children } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {children}
    </LocalizationProvider>
  );
}

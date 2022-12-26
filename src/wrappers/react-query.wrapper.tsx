import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

const client = new QueryClient();

type ReactQueryWrapperProps = {
  children: ReactNode;
};

export function ReactQueryWrapper(props: ReactQueryWrapperProps) {
  const { children } = props;
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

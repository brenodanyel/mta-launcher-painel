import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product, Link as LinkType } from '@/types';
import validator from 'validator';

type DialogType = {
  dialogState?: {
    product: Product;
    mode: 'view' | 'edit';
  };
  setDialogState: (dialogState: DialogType['dialogState']) => void;

  formData: {
    ip: string;
    port: string;
    description: string;
    links: LinkType[];
    logo: string;
  };
  setFormData: (formData: DialogType['formData']) => void;

  resetFormData: () => void;

  errors: {
    ip(): string | undefined;
    port(): string | undefined;
    linkName(link: LinkType): string | undefined;
    linkUrl(link: LinkType): string | undefined;
    description(): string | undefined;
  };

  MAX_CHARACTERS_DESCRIPTION: number;
  MAX_LINKS: number;
};

const ProductDialogContext = createContext<DialogType | null>(null);

type ProductDialogContextProps = {
  children: ReactNode;
};

export function useDialogContext() {
  const context = useContext(ProductDialogContext);

  if (!context) {
    throw new Error(
      'useDialogContext must be used within a ProductDialogContextProvider',
    );
  }

  return context;
}

export function ProductDialogContextProvider(props: ProductDialogContextProps) {
  const { children } = props;

  const [dialogState, setDialogState] = useState<DialogType['dialogState']>();

  const initialFormData: DialogType['formData'] = {
    ip: dialogState?.product.server?.ip ?? '',
    port: String(dialogState?.product.server?.port ?? ''),
    description: dialogState?.product.description ?? '',
    links: dialogState?.product.links ?? [],
    logo: dialogState?.product.logo ?? '',
  };

  useEffect(() => {
    if (!dialogState?.product) return;
    setFormData({
      ip: dialogState.product.server?.ip ?? '',
      port: String(dialogState.product.server?.port ?? ''),
      description: dialogState.product.description ?? '',
      links: dialogState.product.links ?? [],
      logo: dialogState.product.logo ?? '',
    });
  }, [dialogState?.product]);

  const [formData, setFormData] =
    useState<DialogType['formData']>(initialFormData);

  const MAX_CHARACTERS_DESCRIPTION = 6000;
  const MAX_LINKS = 3;

  function resetFormData() {
    setFormData(initialFormData);
  }

  const errors = {
    ip() {
      if (formData.ip && !validator.isIP(formData.ip)) {
        return 'Invalid IP';
      }
    },
    port() {
      if (formData?.port && !validator.isPort(String(formData.port))) {
        return 'Invalid Port';
      }
    },
    linkName(link: LinkType) {
      if (!link.name) return 'Required';
      if (link.name.length < 4) return 'Min 4 characters';
      if (link.name.length > 20) return 'Max 10 characters';
    },
    linkUrl(link: LinkType) {
      if (!link.url) return 'Required';
      if (!validator.isURL(link.url)) {
        return 'Invalid URL';
      }
    },
    description() {
      if (formData.description.length > MAX_CHARACTERS_DESCRIPTION) {
        return `Max ${MAX_CHARACTERS_DESCRIPTION} characters (${
          MAX_CHARACTERS_DESCRIPTION - formData.description.length
        })`;
      }
    },
  };

  const value: DialogType = {
    dialogState,
    setDialogState,

    formData,
    setFormData,

    resetFormData,

    errors,

    MAX_CHARACTERS_DESCRIPTION,
    MAX_LINKS,
  };

  return (
    <ProductDialogContext.Provider value={value}>
      {children}
    </ProductDialogContext.Provider>
  );
}

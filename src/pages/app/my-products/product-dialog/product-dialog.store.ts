import create from 'zustand';

type State = {
  open: boolean;
  mode: 'view' | 'edit';
  productName: string;
  productId: string;
};

type Actions = {
  setOpen(open: State['open']): void;
  setMode(mode: State['mode']): void;
  setProductName(productName: State['productName']): void;
  setProductId(productId: State['productId']): void;
};

export const useProductDialogStore = create<State & Actions>((set) => (
  {
    open: false,
    mode: 'view',
    productName: '',
    productId: '',

    setOpen: (open) => set({ open }),
    setMode: (mode) => set({ mode }),
    setProductName: (productName) => set({ productName }),
    setProductId: (productId) => set({ productId }),
  }
));

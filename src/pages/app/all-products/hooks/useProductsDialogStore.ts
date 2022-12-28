import create from 'zustand';

type State = {
  open: boolean;
  setOpen: (open: State['open']) => void;

  action: 'edit' | 'create';
  setAction: (action: State['action']) => void;

  productId: string;
  setProductId: (productId: State['productId']) => void;

  formData: {
    name: string;
    price: string;
    advantages: {
      id: string;
      description: string;
    }[];
    active: boolean;
  };
  setFormData: (formData: State['formData']) => void;

  errors: {
    name(): string | void;
    price(): string | void;
    advantage(description: string): string | void;
  };
};

export const useProductsDialogStore = create<State>((set, get) => ({
  open: false,
  setOpen: (open) => set({ open }),

  action: 'create',
  setAction: (action) => set({ action }),

  productId: '',
  setProductId: (productId) => set({ productId }),

  formData: {
    name: '',
    price: '',
    advantages: [],
    active: true,
  },
  setFormData: (formData) => set({ formData }),

  errors: {
    name() {
      const { name } = get().formData;
      if (!name) {
        return 'Name is required';
      }
    },
    price() {
      const { price } = get().formData;

      if (!price) {
        return 'Price is required';
      }

      const priceNumber = Number(price);

      if (isNaN(priceNumber)) {
        return 'Price must be a number';
      }

      if (priceNumber < 0) {
        return 'Price must be greater than 0';
      }
    },
    advantage(description) {
      if (!description) {
        return 'Advantage is required';
      }
    },
  },
}));

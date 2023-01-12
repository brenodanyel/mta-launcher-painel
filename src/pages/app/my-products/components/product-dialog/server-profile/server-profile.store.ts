import validator from 'validator';
import moment from 'moment';
import create from 'zustand';

type Link = {
  id: string;
  name: string;
  url: string;
};

type State = {
  formData: {
    ip: string;
    port: string;
    description: string;
    links: Link[];
    logo: string;
    logoBlob?: Blob;
    ownerId?: string;
    removeAt?: Date | null;
  };

  initialFormData: State['formData'];

  errors: {
    ip(): string | void;
    port(): string | void;
    description(): string | void;
    linkName(name: string): string | void;
    linkUrl(url: string): string | void;
    ownerId(): string | void;
    removeAt(): string | void;
  };

  setFormData: (formData: State['formData']) => void;
  setInitialFormData: (initialFormData: State['initialFormData']) => void;
  updateFormDataItem: (key: keyof State['formData'], value: any) => void;
  resetFormData: () => void;

  MAX_CHARACTERS_DESCRIPTION: number;
  MAX_LINKS: number;
};

export const useServerProfileStore = create<State>((set, get) => ({
  formData: {
    ip: '',
    description: '',
    port: '',
    links: [],
    logo: '',
    logoBlob: undefined,
    ownerId: undefined,
    removeAt: undefined,
  },

  initialFormData: {
    ip: '',
    description: '',
    port: '',
    links: [],
    logo: '',
    logoBlob: undefined,
    ownerId: undefined,
    removeAt: undefined,
  },

  MAX_CHARACTERS_DESCRIPTION: 6000,
  MAX_LINKS: 3,

  errors: {
    ip() {
      const { formData } = get();
      if (!formData.ip) return 'Required';
      if (!validator.isIP(formData.ip)) return 'Invalid IP';
    },
    port() {
      const { formData } = get();
      if (!formData.port) return 'Required';
      if (!validator.isPort(String(formData.port))) {
        return 'Invalid Port';
      }
    },
    description() {
      const { formData, MAX_CHARACTERS_DESCRIPTION } = get();
      if (formData.description.length > MAX_CHARACTERS_DESCRIPTION) {
        return `Max ${MAX_CHARACTERS_DESCRIPTION} characters (${MAX_CHARACTERS_DESCRIPTION - formData.description.length})`;
      }
    },
    linkName(name: string) {
      if (!name) return 'Required';
      if (name.length < 4) return 'Min 4 characters';
      if (name.length > 20) return 'Max 10 characters';
    },
    linkUrl(url: string) {
      if (!url) return 'Required';
      if (!url.startsWith('https://')) return 'Link should start with "https://"';
      if (!validator.isURL(url)) return 'Invalid URL';
    },
    ownerId() {
      const { formData } = get();
      if (!formData.ownerId) return 'Required';
    },
    removeAt() {
      const { formData } = get();
      if (formData.removeAt && !moment(formData.removeAt).isValid()) {
        return 'Date is invalid';
      }
    },
  },

  setFormData(formData) {
    set({ formData });
  },

  setInitialFormData(initialFormData) {
    set({ initialFormData });
  },

  resetFormData() {
    const { initialFormData } = get();
    set({ formData: initialFormData });
  },

  updateFormDataItem(key, value) {
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    }));
  },
}));

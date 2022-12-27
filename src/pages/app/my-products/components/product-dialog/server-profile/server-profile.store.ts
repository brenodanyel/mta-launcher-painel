import validator from 'validator';
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
    logoBlob: Blob;
  };

  initialFormData: State['formData'];

  errors: {
    ip(): string | void;
    port(): string | void;
    description(): string | void;
    linkName(name: string): string | void;
    linkUrl(url: string): string | void;
  };

  setFormData: (formData: State['formData']) => void;
  setInitialFormData: (initialFormData: State['initialFormData']) => void;
  updateFormDataItem: (key: keyof State['formData'], value: any) => void;
  resetFormData: () => void;

  MAX_CHARACTERS_DESCRIPTION: number;
  MAX_LINKS: number;
};

export const useServerProfileStore = create<State>((set, get) => (
  {
    formData: {
      ip: '',
      description: '',
      port: '',
      links: [],
      logo: '',
      logoBlob: new Blob(),
    },

    initialFormData: {
      ip: '',
      description: '',
      port: '',
      links: [],
      logo: '',
      logoBlob: new Blob(),
    },

    MAX_CHARACTERS_DESCRIPTION: 6000,
    MAX_LINKS: 3,

    errors: {
      ip() {
        const { formData } = get();
        if (formData.ip && !validator.isIP(formData.ip)) {
          return 'Invalid IP';
        }
      },
      port() {
        const { formData } = get();
        if (formData.port && !validator.isPort(String(formData.port))) {
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
        if (!validator.isURL(url)) {
          return 'Invalid URL';
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
    }
  }
));

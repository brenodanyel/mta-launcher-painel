import create from 'zustand';
import { ServerProfile } from '../../hooks/useMyProducts';

type State = {
  filters: {
    serverIP: string;
    serverPort: string;
    username: string;
    email: string;
    id: string;
  };

  setFilters: (filters: State['filters']) => void;

  filter(input: ServerProfile): boolean;
};

export const useMyProductsFilterStore = create<State>((set, get) => ({
  filters: {
    serverIP: '',
    serverPort: '',
    username: '',
    email: '',
    id: '',
  },

  setFilters: (filters) => set({ filters }),

  filter: (input) => {
    const { serverIP, serverPort, username, email, id } = get().filters;

    if (serverIP) {
      if (!input.ip.startsWith(serverIP)) {
        return false;
      }
    }

    if (serverPort) {
      if (!input.port.toString().startsWith(serverPort)) {
        return false;
      }
    }

    if (username) {
      if (!input.owner.username.startsWith(username)) {
        return false;
      }
    }

    if (email) {
      if (!input.owner.email.startsWith(email)) {
        return false;
      }
    }

    if (id) {
      if (!input.id.startsWith(id)) {
        return false;
      }
    }

    return true;
  },
}));

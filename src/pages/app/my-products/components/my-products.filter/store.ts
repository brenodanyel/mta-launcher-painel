import create from 'zustand';
import { ServerProfile } from '../../hooks/useMyProducts';

type State = {
  serverIP: string;
  setServerIP: (serverIP: State['serverIP']) => void;

  serverPort: string;
  setServerPort: (serverPort: State['serverPort']) => void;

  username: string;
  setUsername: (username: State['username']) => void;

  email: string;
  setEmail: (email: State['email']) => void;

  filter(input: ServerProfile): boolean;
};

export const useMyProductsFilterStore = create<State>((set, get) => ({
  serverIP: '',
  setServerIP: (serverIP) => set({ serverIP }),

  serverPort: '',
  setServerPort: (serverPort) => set({ serverPort }),

  username: '',
  setUsername: (username) => set({ username }),

  email: '',
  setEmail: (email) => set({ email }),

  filter: (input) => {
    const { serverIP, serverPort, username, email } = get();

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

    return true;
  },
}));

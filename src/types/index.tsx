export type Link = {
  name: string;
  url: string;
};

export type Product = {
  id: string;
  name: string;
  createdAt: string;
  removeAt: string | null;
  description?: string;
  logo?: string;
  server?: {
    ip: string;
    port: number;
  };
  links: Link[];
};

export type User = {
  id: number;
  username: string;
  roles: Role[];
};

export type Role = {
  id: number;
  slug: string;
  name: string;
};

export type Link = {
  id: number;
  name: string;
  url: string;
};

export type Product = {
  id: number;
  name: string;
  createdAt: string;
  removedAt: string;
  description?: string;
  logo?: string;
  server?: {
    ip: string;
    port: number;
  };
  links: Link[];
};

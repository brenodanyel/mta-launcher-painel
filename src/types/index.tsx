export type Link = {
  name: string;
  url: string;
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

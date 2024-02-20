type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
  conditions: [string];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [string];
  tags: [string];
  price: number;
  cost: number;
  sizes: [string];
  colors: [string];
  createdAt: string;
  updatedAt: string;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  orders: [string];
  createdAt: string;
  updatedAt: string;
};
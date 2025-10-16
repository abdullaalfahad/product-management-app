export interface Category {
  id: string;
  name: string;
  image: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  createdAt: string;
  updatedAt: string;
}

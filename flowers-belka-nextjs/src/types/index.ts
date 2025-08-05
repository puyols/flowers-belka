export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  isHit?: boolean;
  inStock: boolean;
  shortDescription?: string;
  publishedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  views: number;
  tags: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  children?: MenuItem[];
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
}

export interface DeliveryInfo {
  areas: string[];
  freeDeliveryFrom: number;
  workingHours: string;
  urgentDelivery: boolean;
}

export interface FilterOption {
  id: string;
  name: string;
  count: number;
}

export interface ProductFilters {
  priceRange: {
    min: number;
    max: number;
  };
  tags: FilterOption[];
  categories: FilterOption[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemsCount: number;
}

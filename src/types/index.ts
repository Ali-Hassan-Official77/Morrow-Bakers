export type IconKey =
  | "pretzel"
  | "croissant"
  | "berliner"
  | "loaf"
  | "baguette"
  | "cookie"
  | "cinnamonroll"
  | "cupcake"
  | "tart"
  | "cake"
  | "danish"
  | "financier"
  | "choux"
  | "bun"
  | "tiramisu";

export type ProductCategory =
  | "Breads"
  | "Viennoiserie"
  | "Cakes"
  | "Cookies"
  | "Pastries"
  | "Signature"
  | "Tarts"
  | "Desserts";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  icon: IconKey;
  price: number;
  unit: string;
  tagline: string;
  description: string;
  weight: string;
  allergens: string[];
  featured: boolean;
  badge: string | null;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export type DeliverySlot =
  | "morning"
  | "afternoon"
  | "evening";

export type PaymentMethod =
  | "cod"
  | "card";

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  deliverySlot: DeliverySlot;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status:
    | "received"
    | "baking"
    | "out-for-delivery"
    | "delivered";
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  deliverySlot: DeliverySlot;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status:
    | "received"
    | "baking"
    | "out-for-delivery"
    | "delivered";
}
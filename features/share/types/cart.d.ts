export interface ResponseData {
  carts: {
    id: number;
    products: {
      id: number;
      title: string;
      price: number;
      quantity: number;
      total: number;
      discountPercentage: number;
      discountedTotal: number;
      thumbnail: string;
    }[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  }[];
  total: number;
  skip: number;
  limit: number;
}

type CartStatusType = "refunded" | "pending" | "paid" | "failed";
type ChannelType = "web" | "mobile" | "partner";

export interface Cart {
  id: number;
  sourceCartId: number;
  userId: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  createdAt: string;
  status: CartStatusType;
  channel: ChannelType;
  customerName: string;
  customerEmail: string;
}

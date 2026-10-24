import { Cart, CartStatusType, ChannelType, ResponseData } from "../types";

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";

const STATUSES: CartStatusType[] = ["refunded", "pending", "paid", "failed"];
const CHANNELS: ChannelType[] = ["web", "mobile", "partner"];

export async function getCarts(): Promise<Cart[] | undefined> {
  try {
    const response = await fetch(`${BASE_URL}/carts`, {
      cache: "reload",
      next: {
        tags: ["carts"],
      },
      
    });
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    const data: ResponseData = await response.json();

    const sourceCarts = data.carts;

    return Array.from({ length: 10000 }, (_, i) => {
      const sourceCart = sourceCarts[i % sourceCarts.length];

      return {
        id: i + 1,
        sourceCartId: sourceCart.id,
        userId: (i % 1000) + 1,
        total: sourceCart.total,
        totalProducts: sourceCart.totalProducts,
        totalQuantity: sourceCart.totalQuantity,
        createdAt: new Date(
          Date.UTC(2025, 0, 1 + (i % 365), i % 24, i % 60, i % 60),
        ).toISOString(),
        status: STATUSES[i % STATUSES.length],
        channel: CHANNELS[i % CHANNELS.length],
      };
    });
  } catch (error) {
    throw new Error(`Failed to fetch carts: ${error}`);
  }
}

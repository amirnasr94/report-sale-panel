import { useQuery } from "@tanstack/react-query";
import { Cart, CartStatusType, ChannelType } from "../types";

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";

const STATUSES: CartStatusType[] = ["refunded", "pending", "paid", "failed"];
const CHANNELS: ChannelType[] = ["web", "mobile", "partner"];

export function useDataset() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["carts"],
    queryFn: async (): Promise<Cart[]> => {
      const [cartsResponse, usersResponse] = await Promise.all([
        fetch(`${BASE_URL}/carts?limit=100`),
        fetch(`${BASE_URL}/users?limit=100&select=firstName,lastName,email`),
      ]);
      if (!cartsResponse.ok) {
        throw new Error(`Failed to fetch carts: ${cartsResponse.status}`);
      }
      if (!usersResponse.ok) {
        throw new Error(`Failed to fetch users: ${usersResponse.status}`);
      }
      const dataCarts = await cartsResponse.json();
      const dataUsers = await usersResponse.json();

      return Array.from({ length: 10000 }, (_, index) => {
        const sourceCart = dataCarts.carts[index % dataCarts.carts.length];
        const sourceUser = dataUsers.users[index % dataUsers.users.length];

        return {
          id: index + 1,
          sourceCartId: sourceCart.id * 10000 + (index + 1),
          userId: (index % 1000) + 1,
          total: sourceCart.total,
          totalProducts: sourceCart.totalProducts,
          totalQuantity: sourceCart.totalQuantity,
          customerName: `${sourceUser.firstName} ${sourceUser.lastName}`,
          customerEmail: sourceUser.email,
          createdAt: new Date(
            Date.UTC(
              2025,
              0,
              1 + (index % 365),
              index % 24,
              index % 60,
              index % 60,
            ),
          ).toISOString(),
          status: STATUSES[index % STATUSES.length],
          channel: CHANNELS[index % CHANNELS.length],
        };
      });
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}

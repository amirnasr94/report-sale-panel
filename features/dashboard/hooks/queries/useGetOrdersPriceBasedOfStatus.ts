import { useDataset } from "@/features/share/data/useDataset";
import { CartStatusType } from "@/features/share/types";
import { dateFormatter } from "@/features/share/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useGetOrdersPriceBasedOfStatus(args: {
  status: CartStatusType;
}) {
  const { data, isLoading, error } = useDataset();

  const chartData = useMemo(() => {
    if (!data || !data.length) return [];

    return data
      .filter((item) => item.status === args.status)
      .map((filteredItem) => {
        const date = new Date(filteredItem.createdAt);
        return {
          month: dateFormatter(date),
          totalPrice: filteredItem.total,
        };
      });
  }, [args.status, data]).slice(0, 5);

  return { chartData, isLoading, error };
}

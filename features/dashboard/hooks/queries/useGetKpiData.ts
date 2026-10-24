import { useDataset } from "@/features/share/data/useDataset";
import { useMemo } from "react";

export function useGetKpiData() {
  const { data, isLoading, error } = useDataset();

  const kpiData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        totalSales: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        customerLength: 0,
        refundOrderRate: 0,
      };
    }

    const uniqueCustomers = new Set<number>();
    let refundCount = 0;

    const { totalSales, totalOrders } = data.reduce(
      (acc, cart) => {
        acc.totalSales += cart.total;
        acc.totalOrders += cart.totalProducts;
        uniqueCustomers.add(cart.userId);
        if (cart.status === "refunded") refundCount++;
        return acc;
      },
      { totalSales: 0, totalOrders: 0 },
    );

    return {
      totalSales,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0,
      customerLength: uniqueCustomers.size,
      refundOrderRate: refundCount / data.length * 100,
    };
  }, [data]);

  return { kpiData, isLoading, error };
}

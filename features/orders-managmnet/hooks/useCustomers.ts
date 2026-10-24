import { useDataset } from "@/features/share/data/useDataset";
import { useMemo } from "react";

export function useCustomers() {
  const { data, isLoading, error } = useDataset();

  const customers = useMemo(() => {
    return data?.map((item) => {
      return {
        customerId: item.userId,
        customerName: item.customerName,
        customerEmail: item.customerEmail,
      };
    });
  }, [data]);

  return { customers, isLoading, error };
}

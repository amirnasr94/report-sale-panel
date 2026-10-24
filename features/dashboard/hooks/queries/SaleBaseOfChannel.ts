import { useDataset } from "@/features/share/data/useDataset";
import { useMemo } from "react";

export function useSaleBaseOfChannel() {
  const { data, isLoading, error } = useDataset();

  const chartData = useMemo(() => {
    if (!data || !data.length) return [];

    const { web, mobile, partner } = data.reduce(
      (acc, cart) => {
        if (cart.channel === "web") acc.web += cart.total;
        if (cart.channel === "mobile") acc.mobile += cart.total;
        if (cart.channel === "partner") acc.partner += cart.total;

        return acc;
      },
      {
        web: 0,
        mobile: 0,
        partner: 0,
      },
    );

    return [
      { channel: "web", sale: web },
      { channel: "mobile", sale: mobile },
      { channel: "partern", sale: partner },
    ];
  }, [data]);

  return { chartData, isLoading, error };
}

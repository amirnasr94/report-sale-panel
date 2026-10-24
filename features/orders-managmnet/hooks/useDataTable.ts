import { dateFormatter } from "@/features/share/utils";
import { useDataset } from "@/features/share/data/useDataset";
import { useMemo } from "react";
import { CartStatusType, ChannelType } from "@/features/share/types";

export function useDataTable(args: {
  from: number;
  to: number;
  search: string | null;
  sort: "DATE" | "PRICE" | "DEFAULT";
  startDate: string | null;
  endDate: string | null;
  status: CartStatusType;
  channel: ChannelType;
}) {
  const { data, isLoading, error } = useDataset();
  const dataTB = useMemo(() => {
    const { from, to, search, sort, startDate, endDate, status, channel } =
      args;

    if (!data || !data.length)
      return {
        totalLength: 0,
        data: [],
      };

    const modifiedData = data
      .filter((item) => {
        if (!search) return item;
        return (
          item.sourceCartId.toString().includes(search.trim()) ||
          item.customerName.includes(search.trim()) ||
          item.customerEmail.includes(search.trim())
        );
      })
      .filter((item) => {
        if (!startDate || !endDate) return item;

        const startDateTimeStamp = new Date(startDate).getDate();
        const endDateTimeStamp = new Date(endDate).getDate();
        const itemDateTimeStamp = new Date(item.createdAt).getDate();
        return (
          itemDateTimeStamp > startDateTimeStamp &&
          itemDateTimeStamp < endDateTimeStamp
        );
      })
      .filter((item) => {
        if (!status) return item;
        return item.status === status;
      })
      .filter((item) => {
        if (!channel) return item;
        return item.channel === channel;
      })
      .sort((a, b) => {
        if (sort && sort === "PRICE") {
          return a.total < b.total ? 1 : -1;
        }
        if (sort && sort === "DATE") {
          return new Date(b.total).getDate() > new Date(a.total).getDate()
            ? 1
            : -1;
        }
        return 1;
      });

    return {
      totalLength: modifiedData.length,
      data: modifiedData?.slice(from, to).map((item) => {
        const date = new Date(item.createdAt);
        return {
          orderID: item.sourceCartId,
          date: dateFormatter(date),
          price: item.total,
          productQtc: item.totalProducts,
          status: item.status,
          channel: item.channel,
          customerName: item.customerName,
          customerEmail: item.customerEmail,
        };
      }),
    };
  }, [args, data]);

  return { dataTB, isLoading, error };
}

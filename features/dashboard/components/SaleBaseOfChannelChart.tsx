"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useSaleBaseOfChannel } from "../hooks/queries";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
export default function SaleBaseOfChannelChart() {
  const { chartData, isLoading, error } = useSaleBaseOfChannel();

  if (isLoading || error) {
    return <Loading />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>فروش بر اساس کانال</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="channel"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sale" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function Loading() {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-40 h-5" />
        <Skeleton className="w-40 h-5" />
      </div>
      <Skeleton className="flex-1 h-92" />
    </Card>
  );
}

"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { useGetOrdersPriceBasedOfStatus } from "../hooks/queries";
import { status } from "@/features/share/constants";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function OrdersPriceBasedOfStatusChart() {
  const [statusQueryParam, setStatusQueryParam] = useQueryState("status", {
    defaultValue: "paid",
  });
  const { chartData, isLoading, error } = useGetOrdersPriceBasedOfStatus({
    status: statusQueryParam as keyof typeof status,
  });

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>قیمت سفارشات بر اساس وضعیت</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="w-32"
              render={
                <Button variant="outline">
                  {status[statusQueryParam as keyof typeof status]}
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setStatusQueryParam("paid")}>
                  پرداخت شده
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusQueryParam("pending")}
                >
                  در انتظار پرداخت
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusQueryParam("failed")}>
                  ناموفق
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusQueryParam("refunded")}
                >
                  مسترد شده
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="totalPrice"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function Loading() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="w-40 h-5" />
        <Skeleton className="w-40 h-5" />
      </div>
      <Skeleton className="flex-1 h-92" />
    </Card>
  );
}

"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetKpiData } from "../hooks/queries";
import { Skeleton } from "@/components/ui/skeleton";

export function Kpis() {
  const { kpiData, isLoading, error } = useGetKpiData();

  if (isLoading || error) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-card-foreground">
            مجموع فروش
          </h3>
        </CardHeader>
        <CardContent>
          {kpiData?.totalSales?.toLocaleString("fa-IR")}
        </CardContent>
      </Card>
      <Card className="text-base font-semibold text-card-foreground">
        <CardHeader>
          <h3 className="text-base font-semibold text-card-foreground">
            تعداد سفارش‌ها
          </h3>
        </CardHeader>
        <CardContent>
          {kpiData?.totalOrders?.toLocaleString("fa-IR")}
        </CardContent>
      </Card>
      <Card className="text-base font-semibold text-card-foreground">
        <CardHeader>
          <h3 className="text-base font-semibold text-card-foreground">
            میانگین مبلغ هر سفارش
          </h3>
        </CardHeader>
        <CardContent>
          {kpiData?.averageOrderValue?.toLocaleString("fa-IR")}
        </CardContent>
      </Card>
      <Card className="text-base font-semibold text-card-foreground">
        <CardHeader>تعداد مشتری یکتا</CardHeader>
        <CardContent>
          {kpiData?.customerLength?.toLocaleString("fa-IR")}
        </CardContent>
      </Card>
      <Card className="text-base font-semibold text-card-foreground">
        <CardHeader>نرخ سفارش‌های Refund شده</CardHeader>
        <CardContent>
          {kpiData?.refundOrderRate?.toLocaleString("fa-IR")}%
        </CardContent>
      </Card>
    </div>
  );
}

function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {[...Array(5)].map((_, index) => (
        <Card
          key={index}
          className="text-base font-semibold text-card-foreground p-4"
        >
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-28 h-4" />
        </Card>
      ))}
    </div>
  );
}

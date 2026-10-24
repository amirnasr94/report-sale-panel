"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportName from "./components/ReportName";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useReportForm } from "@/store/useCreateReportForm";
import { Button } from "@/components/ui/button";
import { FormBuilder } from "./components";

export default function CreateReport() {
  const metric = useReportForm((state) => state.metric);
  const group = useReportForm((state) => state.group);
  const setMetric = useReportForm((state) => state.setMetric);
  const setGroup = useReportForm((state) => state.setGroup);
  const setFilters = useReportForm((state) => state.setFilters);
  return (
    <section>
      <Card className="max-w-3xl mx-auto my-10">
        <CardHeader>
          <h3 className="text-2xl">فرم گزارش گیری</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReportName />
          <CardTitle>
            <h4>فرم گزارش گیری</h4>
          </CardTitle>
          <RadioGroup
            onValueChange={(value) => {
              setMetric(value);
            }}
            value={metric}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="revenue" id="revenue-radio" />
              <Label htmlFor="revenue-radio">درآمد</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="orders-count" id="orders-count-radio" />
              <Label htmlFor="orders-count-radio">تعداد سفارشات</Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="average-order-value"
                id="average-order-value-radio"
              />
              <Label htmlFor="average-order-value-radio">
                میانگین مقدار سفارشات
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="customers-count"
                id="customers-count-radio"
              />
              <Label htmlFor="customers-count-radio">تعداد مشتری‌ها</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">اقلام فروخته‌شده</Label>
            </div>
          </RadioGroup>
          <Separator />
          <CardTitle>
            <h4>فرم گزارش گیری</h4>
          </CardTitle>
          <RadioGroup
            onValueChange={(value) => {
              setGroup(value);
            }}
            value={group}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="status-group" id="status-radio" />
              <Label htmlFor="status-radio">وضعیت</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="channel-group" id="channel-radio" />
              <Label htmlFor="channel-radio">کانال</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="year-group" id="year-radio" />
              <Label htmlFor="items-sold-radio">سال</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="month-group" id="month-radio" />
              <Label htmlFor="month-radio">ماه</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="day-group" id="day-radio" />
              <Label htmlFor="day-radio">روز</Label>
            </div>
          </RadioGroup>
          <Separator />
          <div>
            <Button variant={"outline"} onClick={() => setFilters()}>
              افزودن فیلتر +
            </Button>
          </div>
          <FormBuilder />
        </CardContent>
      </Card>
    </section>
  );
}

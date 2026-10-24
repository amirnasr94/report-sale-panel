"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Paginat } from "./Paginat";
import { Input } from "@/components/ui/input";
import { ListSortAscending } from "lucide-react";
import { Button } from "@/components/ui/button";
import { debounce, parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useDeferredValue } from "react";
import { useCustomers, useDataTable } from "../hooks";
import Filters from "./Filters";
import DatePicker from "@/components/DatePicker";
import { channels, status } from "@/features/share/constants";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import { useRouter } from "next/navigation";

const ITEM_PERPAGE = 25;

type Sorting = "DATE" | "PRICE" | "DEFAULT";

export function DataTable() {
  const router = useRouter();
  const [serchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });

  const [statusQuery, setStatusQuery] = useQueryState("status", {
    defaultValue: "",
  });

  const [channelQuery, setChannelQuery] = useQueryState("channel", {
    defaultValue: "",
  });

  const [sortQuery, setSortQuery] = useQueryState("sort", {
    defaultValue: "DEFAULT",
  });

  const [startDataQuery, setStartDateQuery] = useQueryState("startDate", {
    defaultValue: "",
  });

  const [endDateQuery, setEndDateQuery] = useQueryState("endDate", {
    defaultValue: "",
  });

  const [paginate, setPaginate] = useQueryState(
    "paginate",
    parseAsInteger.withDefault(1),
  );

  const deferedSearch = useDeferredValue(serchQuery);

  const { dataTB, isLoading, error } = useDataTable({
    from: (paginate - 1) * ITEM_PERPAGE,
    to: (paginate - 1) * ITEM_PERPAGE + ITEM_PERPAGE,
    search: !deferedSearch ? null : deferedSearch,
    sort: sortQuery as Sorting,
    startDate: startDataQuery,
    endDate: endDateQuery,
    status: statusQuery as keyof typeof status,
    channel: channelQuery as keyof typeof channels,
  });
  // const { customers } = useCustomers();

  const handleChangeDate = useCallback(
    (date: Date | undefined, type: "START_DATE" | "END_DATE") => {
      if (typeof date === "undefined") return;
      const convertedDate = Intl.DateTimeFormat("en-US").format(date);
      if (type === "START_DATE") {
        setStartDateQuery(convertedDate);
        return;
      }
      if (type === "END_DATE") {
        setEndDateQuery(convertedDate);
        return;
      }
    },
    [],
  );

  const handleClearFilter = useCallback(() => {
    router.replace("/orders-managment", undefined);
  }, []);

  if (isLoading || error) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ListSortAscending size={18} color="#737373" />
          <Button
            className="text-sm text-muted-foreground"
            variant={sortQuery === "DATE" ? "secondary" : "ghost"}
            onClick={() => {
              if (sortQuery === "DATE") {
                setSortQuery("DEFAULT");
              } else setSortQuery("DATE");
            }}
          >
            جدیدترین سفارش
          </Button>
          <Button
            className="text-sm text-muted-foreground"
            variant={sortQuery === "PRICE" ? "secondary" : "ghost"}
            onClick={() => {
              if (sortQuery === "PRICE") {
                setSortQuery("DEFAULT");
              } else setSortQuery("PRICE");
            }}
          >
            بیشترین مبلغ سفارش
          </Button>
        </div>
        <div className="flex items-center gap-x-1 w-4/12">
          <Filters onDeleteFilter={handleClearFilter}>
            <div className="flex flex-col lg:flex-row items-center w-full gap-4">
              <DatePicker
                placeholder="تاریخ شروع"
                onChange={(date) => handleChangeDate(date, "START_DATE")}
              />
              <DatePicker
                placeholder="تاریخ پایان"
                onChange={(date) => handleChangeDate(date, "END_DATE")}
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <Combobox
                items={Object.keys(status)}
                multiple
                value={statusQuery.split(",")}
                onValueChange={(value) =>
                  setStatusQuery(value.filter(Boolean).toString())
                }
              >
                <ComboboxChips dir="rtl" className="flex-1">
                  <ComboboxChipsInput placeholder="انتخاب وضعیت" />
                  <ComboboxValue>
                    {statusQuery.split(",").map((item) => (
                      <ComboboxChip key={item}>
                        {status[item as keyof typeof status]}
                      </ComboboxChip>
                    ))}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent dir="rtl">
                  <ComboboxList dir="rtl">
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {status[item as keyof typeof status]}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <Combobox
                items={Object.keys(channels)}
                multiple
                value={channelQuery.split(",")}
                onValueChange={(value) =>
                  setChannelQuery(value.filter(Boolean).toString())
                }
              >
                <ComboboxChips dir="rtl" className="flex-1">
                  <ComboboxChipsInput placeholder="انتخاب کانال" />
                  <ComboboxValue>
                    {channelQuery.split(",").map((item) => (
                      <ComboboxChip key={item}>
                        {channels[item as keyof typeof channels]}
                      </ComboboxChip>
                    ))}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent dir="rtl">
                  <ComboboxEmpty>متاسفانه داده‌ای یافت نشد!</ComboboxEmpty>
                  <ComboboxList dir="rtl">
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {channels[item as keyof typeof channels]}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
            {/* <div className="mx-auto grid w-full max-w-xs gap-3">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="slider-demo-temperature">Temperature</Label>
                <span className="text-sm text-muted-foreground">
                  {value.join(", ")}
                </span>
              </div>
              <Slider
                id="slider-demo-temperature"
                value={value}
                onValueChange={(value) => setValue(value as number[])}
                min={0}
                max={1}
                step={0.1}
              />
            </div> */}
          </Filters>
          <Input
            placeholder="جستجو..."
            className="w-full"
            value={serchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value, {
                limitUrlUpdates:
                  event.target.value === "" ? undefined : debounce(2000),
              })
            }
          />
        </div>
      </div>
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">شناسه سفارش</TableHead>
            <TableHead>مشتری</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead className="text-right">مبلغ (تومان)</TableHead>
            <TableHead className="text-right">تعداد محصول</TableHead>
            <TableHead className="text-right">وضعیت</TableHead>
            <TableHead className="text-right">کانال</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataTB.data.length === 0 ? (
            <TableRow>
              <p>دیتایی یافت نشد!</p>
            </TableRow>
          ) : (
            dataTB.data.map((row) => (
              <TableRow key={row.orderID}>
                <TableCell className="font-medium">{row.orderID}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell className="text-right">
                  <p>{row.price?.toLocaleString("fa-IR")}</p>
                </TableCell>
                <TableCell className="text-right">{row.productQtc}</TableCell>
                <TableCell className="text-right">
                  {status[row.status]}
                </TableCell>
                <TableCell className="text-right">
                  {channels[row.channel]}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="float-right mt-10 w-full">
        <Paginat
          totalCount={dataTB.totalLength}
          currentPage={paginate}
          itemPerPage={ITEM_PERPAGE}
          handleCurrentPage={(cp) => setPaginate(cp)}
          handleNextPage={() => setPaginate((currentPage) => currentPage + 1)}
          handlePreviosPage={() =>
            setPaginate((currentPage) => currentPage - 1)
          }
        />
      </div>
    </section>
  );
}

function Loading() {
  return <></>;
}

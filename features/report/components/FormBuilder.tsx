import DatePicker from "@/components/DatePicker";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReportForm } from "@/store/useCreateReportForm";

const status = [
  { label: "پرداخت شده", value: "paid" },
  { label: "در انتظار پرداخت", value: "pending" },
  { label: "ناموفق", value: "failed" },
  { label: "مسترد شده", value: "refunded" },
];

export function FormBuilder() {
  const filters = useReportForm((state) => state.filters);
  const setEditFilters = useReportForm((state) => state.setEditFilters);
  const setFilterValue = useReportForm((state) => state.setFilterValue);

  function handleModifyFilterRow(
    rowId: string,
    type: "fields" | "operators",
    value: string | null,
  ) {
    if (!value) return;
    const targetRow = filters.find((row) => row.id === rowId);
    if (!targetRow) return;
    if (type === "fields") {
      setEditFilters({
        ...targetRow,
        fields: {
          ...targetRow.fields,
          value,
        },
        operators: {
          ...targetRow.operators,
          value: "",
        },
        values: {},
      });
      return;
    }

    setEditFilters({
      ...targetRow,
      operators: {
        ...targetRow.operators,
        value,
      },
      values: {},
    });
  }

  return (
    <div>
      {filters.map((filter) => {
        const fieldValue = filter.fields.value;
        const operatorValue = filter.operators.value;
        const values = filter.values ?? {};

        return (
          <div
            key={filter.id}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-b border-b-secondary py-4"
          >
            <Field>
              <FieldLabel>انتخاب فیلتر</FieldLabel>
              <Select
                items={filter.fields.options}
                value={
                  !filter.fields.value ? "انتخاب کنید..." : filter.fields.value
                }
                onValueChange={(value) =>
                  handleModifyFilterRow(filter.id, "fields", value)
                }
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filter.fields.options.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>انتخاب عملگر</FieldLabel>
              <Select
                items={
                  filter.operators[
                    filter.fields.value as "amount" | "status" | "date"
                  ]?.options
                }
                value={
                  !filter.operators.value
                    ? "انتخاب کنید..."
                    : filter.operators.value
                }
                onValueChange={(value) =>
                  handleModifyFilterRow(filter.id, "operators", value)
                }
                disabled={!filter.fields.value}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filter.operators[
                      filter.fields.value as "amount" | "status" | "date"
                    ]?.options.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              {fieldValue === "amount" ? (
                <>
                  {operatorValue === "between" ? (
                    <>
                      <FieldLabel>از</FieldLabel>
                      <Input
                        placeholder="مقدار مورد نظر را وارد نمایید..."
                        value={values.from}
                        onChange={(event) =>
                          setFilterValue(filter.id, "from", event.target.value)
                        }
                      />
                      <FieldLabel>تا</FieldLabel>
                      <Input
                        placeholder="مقدار مورد نظر را وارد نمایید..."
                        onChange={(event) =>
                          setFilterValue(filter.id, "to", event.target.value)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <FieldLabel>مقدار</FieldLabel>
                      <Input
                        placeholder="مقدار مورد نظر را وارد نمایید..."
                        value={values.value}
                        onChange={(event) =>
                          setFilterValue(filter.id, "value", event.target.value)
                        }
                      />
                    </>
                  )}
                </>
              ) : fieldValue === "status" ? (
                <>
                  {operatorValue === "equals" ? (
                    <>
                      <FieldLabel>وضعیت</FieldLabel>
                      <Select
                        items={status}
                        value={
                          !values.value
                            ? "انتخاب کنید"
                            : (values.value as string)
                        }
                        onValueChange={(val) =>
                          setFilterValue(filter.id, "value", val as string)
                        }
                      >
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {status.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </>
                  ) : operatorValue === "is-one-of" ? (
                    <>
                      <FieldLabel>وضعیت</FieldLabel>
                      <Combobox
                        items={status}
                        multiple
                        value={values.value as string[]}
                        onValueChange={(value) =>
                          setFilterValue(filter.id, "value", value as string[])
                        }
                      >
                        <ComboboxChips dir="rtl" className="flex-1">
                          <ComboboxChipsInput placeholder="انتخاب وضعیت" />
                          <ComboboxValue>
                            {(values.value as string[])?.map((item) => (
                              <ComboboxChip key={item}>{item}</ComboboxChip>
                            ))}
                          </ComboboxValue>
                        </ComboboxChips>
                        <ComboboxContent dir="rtl">
                          <ComboboxList dir="rtl">
                            {status?.map((item) => (
                              <ComboboxItem key={item.label} value={item.value}>
                                {item.label}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </>
                  ) : null}
                </>
              ) : fieldValue === "date" ? (
                <>
                  {operatorValue === "between" ? (
                    <>
                      <FieldLabel>از تاریخ</FieldLabel>
                      <DatePicker
                        placeholder="انتخاب تاریخ"
                        onChange={(date) =>
                          setFilterValue(
                            filter.id,
                            "from",
                            Intl.DateTimeFormat("en-US").format(date),
                          )
                        }
                      />
                      <FieldLabel>تا تاریخ</FieldLabel>
                      <DatePicker
                        placeholder="انتخاب تاریخ"
                        onChange={(date) =>
                          setFilterValue(
                            filter.id,
                            "to",
                            Intl.DateTimeFormat("en-US").format(date),
                          )
                        }
                      />
                    </>
                  ) : (
                    <>
                      <FieldLabel>تاریخ</FieldLabel>
                      <DatePicker
                        placeholder="انتخاب تاریخ"
                        onChange={(date) =>
                          setFilterValue(
                            filter.id,
                            "value",
                            Intl.DateTimeFormat("en-US").format(date),
                          )
                        }
                      />
                    </>
                  )}
                </>
              ) : null}
            </Field>
          </div>
        );
      })}
    </div>
  );
}

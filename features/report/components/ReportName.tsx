import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useReportForm } from "@/store/useCreateReportForm";
import { useEffect, useState, useTransition } from "react";

const reservedReportName = ["گزارش فروش", "گزارش مدیریتی", "گزارش ماهانه"];

async function checkReservedName(reportName: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (reservedReportName.includes(reportName)) {
      setTimeout(() => {
        reject(true);
      }, 500);
    } else {
      setTimeout(() => {
        resolve(false);
      }, 500);
    }
  });
}
export default function ReportName() {
  const [isPending, startTransition] = useTransition();
  const debounce = useDebounce(500);
  const reportName = useReportForm((state) => state.reportName);
  const setReportname = useReportForm((state) => state.setReportname);

  const [validateReportName, setValidateReportName] = useState<boolean>(false);

  function handleOnChangeReportName(reportName: string) {
    if (typeof reportName !== "string") return;
    setReportname(reportName);
  }

  useEffect(() => {
    const x = debounce(() => {
      startTransition(async () => {
        try {
          const response = await checkReservedName(reportName);
          setValidateReportName(response);
        } catch (error) {
          setValidateReportName(error as boolean);
        }
      });
    });
    x();
  }, [reportName]);

  return (
    <Field>
      <FieldLabel htmlFor="report-name-rtl">نام گزارش</FieldLabel>
      <div className="relative">
        <Input
          id="report-name-rtl"
          placeholder="نام گزارش را وارد نمایید..."
          value={reportName}
          onChange={(event) => {
            handleOnChangeReportName(event.target.value);
          }}
          aria-invalid={validateReportName}
        />
        {isPending && (
          <Spinner className="absolute top-1/2 left-2 transform -translate-y-1/2" />
        )}
      </div>
      {validateReportName && (
        <span className="text-destructive">این نام مجاز نمی‌باشد!</span>
      )}
    </Field>
  );
}

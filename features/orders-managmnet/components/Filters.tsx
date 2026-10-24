import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, FilterXIcon } from "lucide-react";
import { ReactNode } from "react";

export default function Filters({
  onDeleteFilter,
  children,
}: {
  onDeleteFilter: () => void;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline">
            <Filter size={18} />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>فیلترها</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">بستن</Button>} />
          <DialogClose
            render={<Button variant="outline">ذخیره تغییرات</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

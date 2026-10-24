import dynamic from "next/dynamic";
import { Kpis } from "./components";

const OrdersPriceBasedOfStatusChart = dynamic(
  () => import("./components/OrdersPriceBasedOfStatusChart"),
  {
    ssr: false,
  },
);
const SaleBaseOfChannelCahrt = dynamic(
  () => import("./components/SaleBaseOfChannelChart"),
  {
    ssr: false,
  },
);

export function Dashboard() {
  return (
    <section className="flex flex-col gap-4">
      <Kpis />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OrdersPriceBasedOfStatusChart />
        <SaleBaseOfChannelCahrt />
      </div>
    </section>
  );
}

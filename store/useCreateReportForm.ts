import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Item = { label: string; value: string };

type FiltersValue = {
  value?: string | string[];
  from?: string;
  to?: string;
};

type Filter = {
  id: string;
  fields: { value: string; options: Item[] };
  operators: {
    value: string;
    amount: {
      options: Item[];
    };
    status: {
      options: Item[];
    };
    date: {
      options: Item[];
    };
  };
  values: FiltersValue;
};

const initalizeFilter = {
  fields: {
    value: "",
    options: [
      { label: "مقدار", value: "amount" },
      { label: "وضعیت", value: "status" },
      { label: "تاریخ", value: "date" },
    ],
  },
  operators: {
    value: "",
    amount: {
      options: [
        { label: "برابر با", value: "equals" },
        { label: "بیشتر از", value: "greater-than" },
        { label: "کمتر از", value: "less-than" },
        { label: "مابین", value: "between" },
      ],
    },
    status: {
      options: [
        { label: "برابر با", value: "equals" },
        { label: "یکی از", value: "is-one-of" },
      ],
    },
    date: {
      options: [
        { label: "قبل از", value: "before" },
        { label: "بعد از", value: "after" },
        { label: "مابین", value: "between" },
      ],
    },
  },
};

type StateStore = {
  reportName: string;
  metric: string;
  group: string;
  filters: Filter[];
  setReportname: (reportName: string) => void;
  setMetric: (metric: string) => void;
  setGroup: (group: string) => void;
  setFilters: () => void;
  setEditFilters: (filter: Filter) => void;
  setFilterValue: (
    rowId: string,
    key: keyof FiltersValue,
    value: string | string[],
  ) => void;
};

export const useReportForm = create<StateStore>()(
  persist(
    (set) => ({
      reportName: "",
      metric: "",
      group: "",
      filters: [],
      setReportname: (reportName) => set({ reportName }),
      setMetric: (metric) => set({ metric }),
      setGroup: (group) => set({ group }),
      setFilters: () =>
        set((state) => ({
          filters: [
            ...state.filters,
            { ...initalizeFilter, id: crypto.randomUUID(), values: {} },
          ],
        })),
      setEditFilters: (filter) =>
        set((state) => ({
          filters: state.filters.map((item) =>
            item.id === filter.id ? filter : item,
          ),
        })),
      setFilterValue: (rowId, key, value) =>
        set((state) => ({
          filters: state.filters.map((item) =>
            item.id === rowId
              ? { ...item, values: { ...item.values, [key]: value } }
              : item,
          ),
        })),
    }),
    {
      name: "reportForm-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

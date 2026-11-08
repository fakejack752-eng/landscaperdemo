import { create } from "zustand";

type EstimateStore = {
  /** Service title preselected from a service detail page (consumed once by the form). */
  prefillService: string | null;
  assignPrefill: (service: string | null) => void;
};

/** Front-end only store used to pass a service selection from a service page
 *  to the multi-step estimate form. No data ever leaves the browser. */
export const useEstimateStore = create<EstimateStore>((set) => ({
  prefillService: null,
  assignPrefill: (service) => set({ prefillService: service }),
}));

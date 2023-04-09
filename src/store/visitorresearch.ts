import { defineStore } from "pinia";
import { VisitorResearch, VisitorResearchState } from "@/models/types";

// Хранилище для исследований пациентов, для каждого ентити свое
export const useVisitorResearchStore = defineStore("visitorResearch", {
  state: (): VisitorResearchState => ({
    visitorsresearch: undefined,
  }),
  getters: {
    getVisitorsResearch: (state) => state.visitorsresearch || [],
  },
  actions: {
    setVisitorsResearch(visitorsResearch: Array<VisitorResearch>) {
      this.visitorsresearch = visitorsResearch;
    },
  },
});

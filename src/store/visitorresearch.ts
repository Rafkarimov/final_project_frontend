import { defineStore } from "pinia";
import { VisitorResearch, VisitorResearchState } from "@/models/types";

// Хранилище для исследований пациентов, для каждого ентити свое
export const useVisitorResearchStore = defineStore("visitorResearch", {
  state: (): VisitorResearchState => ({
    visitorsresearches: undefined,
  }),
  getters: {
    getVisitorsResearch: (state) => state.visitorsresearches || [],
  },
  actions: {
    setVisitorsResearch(visitorsResearch: Array<VisitorResearch>) {
      this.visitorsresearches = visitorsResearch;
    },
  },
});

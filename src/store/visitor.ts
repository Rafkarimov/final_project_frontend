import { defineStore } from "pinia";
import { Visitor, VisitorState } from "@/models/types";

// Хранилище для докторов, для каждого ентити свое
export const useVisitorStore = defineStore("visitor", {
  state: (): VisitorState => ({
    visitors: undefined,
  }),
  getters: {
    getVisitors: (state) => state.visitors || [],
  },
  actions: {
    setVisitors(visitors: Array<Visitor>) {
      this.visitors = visitors;
    },
  },
});

import { defineStore } from "pinia";
import { Reception, ReceptionState } from "@/models/types";

// Хранилище для мед специализаций, для каждого ентити свое
export const useReceptionStore = defineStore("reception", {
  state: (): ReceptionState => ({
    receptions: undefined,
  }),
  getters: {
    getReceptions: (state) => state.receptions || [],
  },
  actions: {
    setReceptions(receptions: Array<Reception>) {
      this.receptions = receptions;
    },
  },
});

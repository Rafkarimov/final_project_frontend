import { defineStore } from "pinia";
import { LaboratoryAssistant, LaboratoryAssistantState } from "@/models/types";

// Хранилище для мед специализаций, для каждого ентити свое
export const useLaboratoryAssistantStore = defineStore("laboratoryAssistant", {
  state: (): LaboratoryAssistantState => ({
    laboratoryassistants: undefined,
  }),
  getters: {
    getLaboratoryAssistants: (state) => state.laboratoryassistants || [],
  },
  actions: {
    setLaboratoryAssistants(laboratoryassistants: Array<LaboratoryAssistant>) {
      this.laboratoryassistants = laboratoryassistants;
    },
  },
});

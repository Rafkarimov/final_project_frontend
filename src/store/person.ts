import { defineStore } from "pinia";
import { Person, PersonState } from "@/models/types";

// Хранилище для мед специализаций, для каждого ентити свое
export const usePersonStore = defineStore("person", {
  state: (): PersonState => ({
    persons: undefined,
  }),
  getters: {
    getPersons: (state) => state.persons || [],
  },
  actions: {
    setPersons(persons: Array<Person>) {
      this.persons = persons;
    },
  },
});

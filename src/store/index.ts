import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const randomCount = computed(() => {
    const res = Math.floor(Math.random() * 11);
    console.log(res);
    return res;
  });

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value -= randomCount.value;
  }

  return { count, randomCount, increment, decrement };
});

export const useCounterStore2 = defineStore("counter2", () => {
  const count = ref();
  const randomCount = computed(() => {
    const res = Math.floor(Math.random() * 11);
    console.log(res);
    return res;
  });

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value -= randomCount.value;
  }

  return { count, randomCount, increment, decrement };
});

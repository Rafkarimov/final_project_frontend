<template>
  <h1 class="mb-5">Список пациентов</h1>
  <button class="btn btn-primary mb-5" @click="fetchData">
    Показать пациентов
  </button>
  <div class="container">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Person</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visitor in visitorStore.getVisitors" :key="visitor.id">
          <td>{{ visitor.id }}</td>
          <td>{{ visitor.person }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useVisitorStore } from "@/store/visitor";
import { getVisitors } from "@/api/http";

// компонент для списка пациентов
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Visitor",
  setup() {
    const error = ref(false); // описать
    const isLoading = ref(false); // описать
    const visitorStore = useVisitorStore(); // описать
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const visitors = await getVisitors(); // вызов HTTP API при помощи Axios
        console.log(visitors); // описать
        visitorStore.setVisitors(visitors); // сохранение в хранилище Vue
      } catch {
        error.value = true;
      } finally {
        isLoading.value = false;
      }
    };
    // что-то наподобие конструктора
    onMounted(() => {
      // fetchData();
    });

    return {
      error,
      isLoading,
      fetchData,
      visitorStore,
    };
  },
});
</script>

<style scoped></style>

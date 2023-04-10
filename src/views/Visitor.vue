<template>
  <h1 class="mb-5">Список пациентов</h1>
  <div class="container">
    <button class="btn btn-primary mb-5">Create new</button>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>№</th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>День рождение</th>
          <th>Телефон</th>
          <th>E-mail</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visitor in visitorStore.getVisitors" :key="visitor.id">
          <td>{{ visitor.id }}</td>
          <td>{{ visitor.person.lastName }}</td>
          <td>{{ visitor.person.firstName }}</td>
          <td>{{ visitor.person.middleName }}</td>
          <td>{{ formatDate(visitor.person.birthDate) }}</td>
          <td>{{ visitor.person.phone }}</td>
          <td>{{ visitor.person.email }}</td>
          <td>
            <button class="btn btn-success mb-5">Edit</button>
          </td>
          <td>
            <button class="btn btn-danger mb-5">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useVisitorStore } from "@/store/visitor";
import { getVisitors } from "@/api/http";
import { formatDate } from "@/utils/util";

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
      fetchData();
    });

    return {
      error,
      isLoading,
      fetchData,
      visitorStore,
      formatDate,
    };
  },
});
</script>

<style scoped></style>

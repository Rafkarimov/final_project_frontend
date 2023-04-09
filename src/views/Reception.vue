<template>
  <h1 class="mb-5">Reception</h1>
  <div class="container">
    <button class="btn btn-primary mb-5">Create new</button>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Visitor</th>
          <th>Doctor</th>
          <th>Reception Date Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="reception in receptionsStore.getReceptions"
          :key="reception.id"
        >
          <td>{{ reception.id }}</td>
          <td>{{ reception.visitor }}</td>
          <td>{{ reception.doctor }}</td>
          <td>{{ formatDateTime(reception.receptionDateTime) }}</td>
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
import { useReceptionStore } from "@/store/reception";
import { getReceptions } from "@/api/http";
import { formatDateTime } from "@/utils/util";

// компонент для приемов
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Reception",
  setup() {
    const error = ref(false);
    const isLoading = ref(true);
    const receptionsStore = useReceptionStore();
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const receptions = await getReceptions(); //вызов HTTP API при помощи Axios
        console.log(receptions);
        receptionsStore.setReceptions(receptions); //сохранение в хранилище Vue
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
      receptionsStore,
      formatDateTime,
    };
  },
});
</script>

<style scoped></style>

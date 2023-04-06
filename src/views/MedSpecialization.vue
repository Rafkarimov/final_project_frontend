<template>
  <h1 class="mb-5">Medspecializations</h1>
  <div class="container">
    <button class="btn btn-primary mb-5">Create new</button>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="medspecialization in medSpecializationStore.getMedSpecializations"
          :key="medspecialization.id"
        >
          <td>{{ medspecialization.id }}</td>
          <td>{{ medspecialization.title }}</td>
          <td>{{ medspecialization.description }}</td>
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

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useMedSpecializationStore } from "@/store/medspecialization";
import { getMedSpecializations } from "@/api/http";

// компонент для мед специализации
export default defineComponent({
  name: "MedSpecialization",
  setup() {
    const error = ref(false);
    const isLoading = ref(false);
    const medSpecializationStore = useMedSpecializationStore();
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const medSpecializations = await getMedSpecializations(); // вызов HTTP API при помощи Axios
        console.log(medSpecializations);
        medSpecializationStore.setMedSpecializations(medSpecializations); // сохранение в хранилище Vue
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
      medSpecializationStore,
    };
  },
});
</script>

<style scoped></style>

<template>
  <h1 class="mb-5">Medspecializations</h1>
  <button class="btn btn-primary mb-5" @click="fetchData">
    Show medspecializations
  </button>
  <div class="container">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
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
      // fetchData();
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

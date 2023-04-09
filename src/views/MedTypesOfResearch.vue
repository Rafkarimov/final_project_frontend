<template>
  <h1 class="mb-5">MedTypesOfResearch</h1>
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
          v-for="medtypesofresearch in medTypesOfResearchStore.getMedTypesOfResearch1"
          :key="medtypesofresearch.id"
        >
          <td>{{ medtypesofresearch.id }}</td>
          <td>{{ medtypesofresearch.title }}</td>
          <td>{{ medtypesofresearch.description }}</td>
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
import { usemedTypesOfResearchStore } from "@/store/medtypesofresearch";
import { getMedTypesOfResearch1 } from "@/api/http";

// компонент для видов мед исследований
export default defineComponent({
  name: "MedTypesOfResearch",
  setup() {
    const error = ref(false);
    const isLoading = ref(false);
    const medTypesOfResearchStore = usemedTypesOfResearchStore();
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const medTypesOfResearch1 = await getMedTypesOfResearch1(); // вызов HTTP API при помощи Axios
        console.log(medTypesOfResearch1);
        medTypesOfResearchStore.setMedTypesOfResearch1(medTypesOfResearch1); // сохранение в хранилище Vue
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
      medTypesOfResearchStore,
    };
  },
});
</script>

<style scoped></style>

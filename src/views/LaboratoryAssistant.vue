<template>
  <h1 class="mb-5">LaboratoryAssistants</h1>
  <div class="container">
    <button class="btn btn-primary mb-5">Create new</button>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Person</th>
          <!--          <th>Medtypesofresearch</th>-->
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="laboratoryassistant in laboratoryAssistantStore.getLaboratoryAssistants"
          :key="laboratoryassistant.id"
        >
          <td>{{ laboratoryassistant.id }}</td>
          <td>{{ laboratoryassistant.person }}</td>
          <!--          <td>{{ laboratoryassistant.medTypesOfResearchList }}</td>-->
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
// компонент для лаборантов
import { defineComponent, onMounted, ref } from "vue";
import { useLaboratoryAssistantStore } from "@/store/laboratoryassistant";
import { getLaboratoryAssistants } from "@/api/http";

export default defineComponent({
  name: "LaboratoryAssistant",
  setup() {
    const error = ref(false);
    const isLoadnig = ref(true);
    const laboratoryAssistantStore = useLaboratoryAssistantStore();
    const fetchData = async () => {
      error.value = false;
      isLoadnig.value = true;
      try {
        const laboratoryAssistants = await getLaboratoryAssistants(); // вызов HTTP API при помощи Axios
        console.log(laboratoryAssistants);
        laboratoryAssistantStore.setLaboratoryAssistants(laboratoryAssistants); // сохранение в хранилище Vue
      } catch {
        error.value = true;
      } finally {
        isLoadnig.value = false;
      }
    };

    // что-то наподобие конструктора
    onMounted(() => {
      fetchData();
    });

    return {
      error,
      isLoadnig,
      fetchData,
      laboratoryAssistantStore,
    };
  },
});
</script>

<style scoped></style>

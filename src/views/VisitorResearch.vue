<template>
  <h1 class="mb-5">VisitorResearchs</h1>
  <div class="container">
    <button class="btn btn-primary mb-5">Create new</button>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Visitor</th>
          <th>Doctor</th>
          <th>LaboratoryAssistant</th>
          <th>DateOfReferralForResearch</th>
          <th>DateOfResearch</th>
          <th>MedTypesOfResearch</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="visitorresearch in visitorResearchStore.getVisitorsResearch"
          :key="visitorresearch.id"
        >
          <td>{{ visitorresearch.id }}</td>
          <td>{{ visitorresearch.visitor }}</td>
          <td>{{ visitorresearch.doctor }}</td>
          <td>{{ visitorresearch.laboratoryAssistant }}</td>
          <td>{{ visitorresearch.dateOfReferralForResearch }}</td>
          <td>{{ visitorresearch.dateOfResearch }}</td>
          <td>{{ visitorresearch.medTypesOfResearch }}</td>
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
import { useVisitorResearchStore } from "@/store/visitorresearch";
import { getVisitorsResearch } from "@/api/http";

// компонент для исследований посетителей
export default defineComponent({
  name: "VisitorResearch",
  setup() {
    const error = ref(false);
    const isLoading = ref(true);
    const visitorResearchStore = useVisitorResearchStore();
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const visitorsResearch = await getVisitorsResearch(); // вызов HTTP API при помощи Axios
        console.log(visitorsResearch);
        visitorResearchStore.setVisitorsResearch(visitorsResearch); // сохранение в хранилище Vue
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
      visitorResearchStore,
    };
  },
});
</script>

<style scoped></style>

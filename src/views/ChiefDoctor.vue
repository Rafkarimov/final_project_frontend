<template>
  <h1 class="mb-5">Главный врач и администратор</h1>
  <button class="btn btn-primary mb-5" @click="fetchData">
    Показать список
  </button>
  <div class="container">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Person</th>
          <th>MedSpecialization</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="chiefdoctors in chiefDoctorStore.getChiefDoctors"
          :key="chiefdoctors.id"
        >
          <td>{{ chiefdoctors.id }}</td>
          <td>{{ chiefdoctors.person }}</td>
          <td>{{ chiefdoctors.medSpecialization }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useChiefDoctorStore } from "@/store/chiefdoctor";
import { getChiefDoctors } from "@/api/http";

// компонент для списка
export default defineComponent({
  name: "ChiefDoctor",
  setup() {
    const error = ref(false);
    const isLoading = ref(false);
    const chiefDoctorStore = useChiefDoctorStore();
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const chiefDoctors = await getChiefDoctors(); // вызов HTTP API при помощи Axios
        console.log(chiefDoctors);
        chiefDoctorStore.setChiefDoctors(chiefDoctors); // сохранение в хранилище Vue
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
      chiefDoctorStore,
    };
  },
});
</script>

<style scoped></style>

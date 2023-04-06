<template>
  <h1 class="mb-5">Список врачей</h1>
  <button class="btn btn-primary mb-5" @click="fetchData">
    Показать врачей
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
        <tr v-for="doctor in doctorStore.getDoctors" :key="doctor.id">
          <td>{{ doctor.id }}</td>
          <td>{{ doctor.person }}</td>
          <td>{{ doctor.medSpecialization }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useDoctorStore } from "@/store/doctor";
import { getDoctors } from "@/api/http";

// компонент для списка врачей
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Doctor",
  setup() {
    const error = ref(false); // описать
    const isLoading = ref(false); // описать
    const doctorStore = useDoctorStore(); // описать
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const doctors = await getDoctors(); // вызов HTTP API при помощи Axios
        console.log(doctors); // описать
        doctorStore.setDoctors(doctors); // сохранение в хранилище Vue
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
      doctorStore,
    };
  },
});
</script>

<style scoped></style>

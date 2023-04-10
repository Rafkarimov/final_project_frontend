<template>
  <h1 class="mb-5">Список врачей</h1>
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
          <th>Специализация</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doctor in doctorStore.getDoctors" :key="doctor.id">
          <td>{{ doctor.id }}</td>
          <td>{{ doctor.person.lastName }}</td>
          <td>{{ doctor.person.firstName }}</td>
          <td>{{ doctor.person.middleName }}</td>
          <td>{{ formatDate(doctor.person.birthDate) }}</td>
          <td>{{ doctor.person.phone }}</td>
          <td>{{ doctor.person.email }}</td>
          <td>{{ doctor.medSpecialization.title }}</td>
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
import { useDoctorStore } from "@/store/doctor";
import { getDoctors } from "@/api/http";
import { formatDate } from "@/utils/util";

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
      fetchData();
    });

    return {
      error,
      isLoading,
      fetchData,
      doctorStore,
      formatDate,
    };
  },
});
</script>

<style scoped></style>

<template>
  <h1 class="mb-5">Главный врач и администратор</h1>
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
        <tr
          v-for="chiefdoctors in chiefDoctorStore.getChiefDoctors"
          :key="chiefdoctors.id"
        >
          <td>{{ chiefdoctors.id }}</td>
          <td>{{ chiefdoctors.person.lastName }}</td>
          <td>{{ chiefdoctors.person.firstName }}</td>
          <td>{{ chiefdoctors.person.middleName }}</td>
          <td>{{ formatDate(chiefdoctors.person.birthDate) }}</td>
          <td>{{ chiefdoctors.person.phone }}</td>
          <td>{{ chiefdoctors.person.email }}</td>
          <td>{{ chiefdoctors.medSpecialization.title }}</td>
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
import { useChiefDoctorStore } from "@/store/chiefdoctor";
import { getChiefDoctors } from "@/api/http";
import { formatDate } from "@/utils/util";

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
      fetchData();
    });

    return {
      error,
      isLoading,
      fetchData,
      chiefDoctorStore,
      formatDate,
    };
  },
});
</script>

<style scoped></style>

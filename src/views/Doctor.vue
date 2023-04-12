<template>
  <h1 class="mb-5">Список врачей</h1>
  <div class="container">
    <button class="btn btn-primary mb-5">Create new</button>
    <table class="table table-striped table-bordered table-sm">
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
          <td class="align-middle">{{ doctor.id }}</td>
          <td class="align-middle">{{ doctor.person.lastName }}</td>
          <td class="align-middle">{{ doctor.person.firstName }}</td>
          <td class="align-middle">{{ doctor.person.middleName }}</td>
          <td class="align-middle">
            {{ formatDate(doctor.person.birthDate) }}
          </td>
          <td class="align-middle">{{ doctor.person.phone }}</td>
          <td class="align-middle">{{ doctor.person.email }}</td>
          <td
            class="align-middle"
            @mouseenter="
              showPopover($event, doctor.medSpecialization.description)
            "
            @mouseleave="hidePopover"
          >
            {{ doctor.medSpecialization.title }}
          </td>
          <td class="align-middle">
            <button class="btn btn-success">Edit</button>
          </td>
          <td class="align-middle">
            <button class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useDoctorStore } from "@/store/doctor";
import { getDoctors } from "@/api/http";
import { formatDate } from "@/utils/util";
import { Popover } from "bootstrap";

// компонент для списка врачей
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Doctor",
  setup() {
    const error = ref(false); // описать
    const isLoading = ref(false); // описать
    const doctorStore = useDoctorStore(); // описать
    let info: Popover | undefined = undefined;

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

    function showPopover(event: { target: string | Element }, content: string) {
      info = new Popover(event.target, {
        placement: "top",
        trigger: "focus",
        content: content,
      });
      info.show();
    }

    function hidePopover() {
      info?.hide();
    }

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
      showPopover,
      hidePopover,
    };
  },
});
</script>

<style scoped></style>

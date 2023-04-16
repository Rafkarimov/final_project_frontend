<template>
  <h1 class="mb-5">Список врачей</h1>
  <div class="container">
    <button class="btn btn-primary mb-5" @click="openModal">Create new</button>
    <ModalComponent v-model="modalProperties" title="Create doctor">
      <div class="myform">
        <form @submit.prevent="handleSaveSubmit">
          <div class="mb-3 mt-4">
            <label for="loginInput" class="form-label">Login</label>
            <input
              v-model="saveForm.person.email"
              type="text"
              class="form-control"
              id="loginInput"
              aria-describedby="loginHelp"
            />
          </div>
          <div class="mb-3 mt-4">
            <label for="passwordInput" class="form-label">Password</label>
            <input
              id="loginInput"
              v-model="saveForm.person.email"
              aria-describedby="loginHelp"
              class="form-control"
              type="text"
            />
          </div>
        </form>
      </div>
      <template #footer>
        <button type="button" class="btn btn-secondary" @click="closeModal">
          Close
        </button>
        <button type="button" class="btn btn-primary" @click="saveDoctor">
          Save changes
        </button>
      </template>
    </ModalComponent>
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
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useDoctorStore } from "@/store/doctor";
import { getDoctors } from "@/api/http";
import { formatDate } from "@/utils/util";
import { Popover } from "bootstrap";
import ModalComponent from "@/components/ModalComponent.vue";

// компонент для списка врачей
export default defineComponent({
  // ToDo переназвать все виды
  name: "DoctorView",
  components: { ModalComponent },
  setup() {
    const saveForm = reactive({
      person: {
        login: "",
        password: "",
        lastName: "",
        firstName: "",
        middleName: "",
        birthDate: "",
        phone: "",
        email: "",
        snils: "",
      },
      medSpecialization: "",
    });
    const error = ref(false); // описать
    const isLoading = ref(false); // описать
    const doctorStore = useDoctorStore(); // описать
    let info: Popover | undefined = undefined;

    const modalProperties = ref({ isVisible: false, size: "modal-lg" });

    const handleSaveSubmit = () => {
      console.log("HELLO");
    };

    function openModal() {
      modalProperties.value.isVisible = true;
    }

    function closeModal() {
      modalProperties.value.isVisible = false;
    }

    async function saveDoctor() {
      // логика сохранения доктора на сервер
      closeModal();
    }

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
      modalProperties,
      openModal,
      closeModal,
      saveDoctor,
      handleSaveSubmit,
      saveForm,
    };
  },
});
</script>

<style scoped></style>

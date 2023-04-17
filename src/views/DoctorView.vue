<template>
  <h1 class="mb-5">Список врачей</h1>
  <div class="container">
    <button class="btn btn-primary mb-5" @click="openModal">Create new</button>
    <ModalComponent v-model="modalProperties" title="Create doctor">
      <form @submit.prevent="handleSaveSubmit">
        <div class="alert alert-danger" role="alert" v-if="error">
          Произошла ошибка!
        </div>
        <div v-if="!isLoading">
          <div class="row mb-3">
            <label for="loginInput" class="form-label col-sm-3 col-form-label"
              >Логин</label
            >
            <div class="col-sm-9">
              <input
                v-model="saveForm.person.login"
                id="loginInput"
                type="text"
                class="form-control"
                aria-describedby="loginHelp"
                v-bind:class="{ 'is-invalid': saveFormErrors.loginError }"
              />
              <div class="invalid-feedback">
                Требования к полю Логин: может содержать буквы латиницы и цифры,
                не цифры, не должно быть пустым. Пример: Ivan2023
              </div>
              <div v-if="loginError" class="app-invalid-feedback">
                Логин уже используется!
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="d-inline-flex">
              <label class="form-label col-form-label col-sm-3">Пароль</label>
              <div class="input-group">
                <input
                  v-model="saveForm.person.password"
                  id="passwordInput"
                  :type="`${passwordType}`"
                  class="form-control"
                  aria-describedby="passwordHelp"
                  v-bind:class="{
                    'is-invalid': saveFormErrors.passwordError,
                  }"
                />
                <div class="invalid-feedback">
                  Требования к полю Пароль: должно содержать минимум 12
                  символов, одну заглавную и одну строчную буквы латиницы, одну
                  цифру, один специальный символ @#$%^&+=_ Поле не может быть
                  пустым. Пример: Primer2023*-
                </div>
                <button
                  class="btn open-password-btn"
                  type="button"
                  @click="openOrHidePassword"
                >
                  <span class="btn-label" style="color: black"
                    ><font-awesome-icon icon="fa-solid fa-user-secret"
                  /></span>
                </button>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label for="emailInput" class="form-label col-sm-3 col-form-label"
              >Е-мейл</label
            >
            <div class="col-sm-9">
              <input
                v-model="saveForm.person.email"
                id="emailInput"
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                v-bind:class="{ 'is-invalid': saveFormErrors.emailError }"
              />
              <div class="invalid-feedback">
                Требования к полю Е-майл: может содержать буквы латиницы и цифры
                в цифры в формате @priver.ru, не может быть пустым. Пример:
                Ivan2023@primer.ru
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label
              for="lastNameInput"
              class="form-label col-sm-3 col-form-label"
              >Фамилия</label
            >
            <div class="col-sm-9">
              <input
                v-model="saveForm.person.lastName"
                id="lastNameInput"
                type="text"
                class="form-control"
                aria-describedby="lastNameHelp"
                v-bind:class="{ 'is-invalid': saveFormErrors.lastNameError }"
              />
              <div class="invalid-feedback">
                Требования к полю Фамилия: заполняется только кириллицей, не
                может быть пустым!
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label
              for="firstNameInput"
              class="form-label col-sm-3 col-form-label"
              >Имя</label
            >
            <div class="col-sm-9">
              <input
                v-model="saveForm.person.firstName"
                id="firstNameInput"
                type="text"
                class="form-control"
                aria-describedby="firstNameHelp"
                v-bind:class="{ 'is-invalid': saveFormErrors.firstNameError }"
              />
              <div class="invalid-feedback">
                Требования к полю Имя: заполняется только кириллицей, не может
                быть быть пустым!
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label
              for="middleNameInput"
              class="form-label col-sm-3 col-form-label"
              >Отчество</label
            >
            <div class="col-sm-9">
              <input
                v-model="saveForm.person.middleName"
                id="middleNameInput"
                type="text"
                class="form-control"
                aria-describedby="middleNameHelp"
                v-bind:class="{
                  'is-invalid': saveFormErrors.middleNameError,
                }"
              />
              <div class="invalid-feedback">
                Требования к полю Отчество: заполняется только кириллицей, не
                может быть пустым!
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label
              for="birthDateInput"
              class="form-label col-sm-3 col-form-label"
              >Дата рождения</label
            >
            <div class="col-sm-9">
              <VueDatePicker
                v-model="saveForm.person.birthDate"
                :format="calendarDateFormat"
                placeholder="Выберите дату ..."
                input-class-name="dp-custom-input"
                :state="!saveFormErrors.birthDateError"
                :min-date="getMinDate()"
                :max-date="getMaxDate()"
                :start-date="getMaxDate()"
                prevent-min-max-navigation
                ignore-time-validation
              >
              </VueDatePicker>
              <div
                v-if="saveFormErrors.birthDateError"
                class="app-invalid-feedback"
              >
                Требования к полю Дата рождения: воспользуйтесь календарем для
                для для ввода. Поле не может быть пустым!
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label for="phoneInput" class="form-label col-sm-3 col-form-label"
              >Телефон</label
            >
            <div class="col-sm-9">
              <input
                v-model="saveForm.person.phone"
                id="phoneInput"
                type="text"
                class="form-control"
                aria-describedby="phoneHelp"
                v-bind:class="{ 'is-invalid': saveFormErrors.phoneError }"
              />
              <div class="invalid-feedback">
                Требования к полю Телефон: номер должен начинаться с +7 и 10
                цифр, цифр, не может быть пустым. Пример +71234512345!
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label for="snilsInput" class="form-label col-sm-3 col-form-label"
              >СНИЛС</label
            >
            <div class="col-sm-9">
              <input
                v-model="saveForm.person.snils"
                id="snilsInput"
                type="text"
                class="form-control"
                aria-describedby="snilsHelp"
                v-bind:class="{ 'is-invalid': saveFormErrors.snilsError }"
              />
              <div class="invalid-feedback">
                Требования к полю СНИЛС: поле должно содержать только 10 цифр
                цифр цифр цифр пробелов и тире. Поле не может быть пустым!
              </div>
            </div>
          </div>
        </div>
      </form>

      <template #footer>
        <button type="button" class="btn btn-secondary" @click="closeModal">
          Close
        </button>
        <button type="button" class="btn btn-primary" @click="register">
          Save changes
        </button>
      </template>
      <div class="spinner-div" v-if="isLoading">
        <h3 class="mb-5">Ждите...</h3>
        <div class="spinner-border text-primary">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
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
            <button class="btn btn-success" @click="openModal">
              Edit
              <ModalComponent v-model="modalProperties" title="Edit doctor">
                <form @submit.prevent="handleSaveSubmit">
                  <div class="alert alert-danger" role="alert" v-if="error">
                    Произошла ошибка!
                  </div>
                  <div v-if="!isLoading">
                    <div class="row mb-3">
                      <label
                        for="loginInput"
                        class="form-label col-sm-3 col-form-label"
                        >Логин</label
                      >
                      <div class="col-sm-9">
                        <input
                          v-model="saveForm.person.login"
                          id="loginInput"
                          type="text"
                          class="form-control"
                          aria-describedby="loginHelp"
                          v-bind:class="{
                            'is-invalid': saveFormErrors.loginError,
                          }"
                        />
                        <div class="invalid-feedback">
                          Требования к полю Логин: может содержать буквы
                          латиницы и цифры, не цифры, не должно быть пустым.
                          Пример: Ivan2023
                        </div>
                        <div v-if="loginError" class="app-invalid-feedback">
                          Логин уже используется!
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <template #footer>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="closeModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="register"
                  >
                    Save changes
                  </button>
                </template>
                <div class="spinner-div" v-if="isLoading">
                  <h3 class="mb-5">Ждите...</h3>
                  <div class="spinner-border text-primary">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </ModalComponent>
            </button>
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
import { getDoctors, saveDoctor } from "@/api/http";
import { formatDate, getMaxDate, getMinDate } from "@/utils/util";
import { Popover } from "bootstrap";
import ModalComponent from "@/components/ModalComponent.vue";
import { ErrorResponse, Person } from "@/models/types";
import router from "@/router";
import { AxiosError } from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";

// компонент для списка врачей
export default defineComponent({
  name: "DoctorView",
  components: { ModalComponent, VueDatePicker },
  methods: { getMinDate, getMaxDate },
  setup() {
    // const saveFormDoctor = reactive({
    //   person: {
    //     login: "",
    //     password: "",
    //     lastName: "",
    //     firstName: "",
    //     middleName: "",
    //     birthDate: "",
    //     phone: "",
    //     email: "",
    //     snils: "",
    //   },
    //   medSpecialization: "",
    // });

    const saveForm = reactive({
      person: {
        login: "",
        password: "",
        email: "",
        lastName: "",
        firstName: "",
        middleName: "",
        birthDate: null,
        phone: "",
        snils: "",
      },
    });

    const saveFormErrors = reactive({
      loginError: false,
      passwordError: false,
      emailError: false,
      lastNameError: false,
      firstNameError: false,
      middleNameError: false,
      birthDateError: false,
      phoneError: false,
      snilsError: false,
    });

    const error = ref(false); // описать
    const isLoading = ref(false); // описать
    const loginError = ref(false); // описать
    const emailError = ref(false); // описать
    const phoneError = ref(false); // описать
    const passwordType = ref("password");

    const calendarDateInputOptions = ref({
      format: "dd.MM.yyyy",
    });

    const calendarDateFormat = (date: Date) => {
      if (date) {
        return date.toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
      return null;
    };

    function openOrHidePassword() {
      passwordType.value =
        passwordType.value === "password" ? "text" : "password";
    }

    const register = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        validateForm(); // все поля формы валидируются
        if (!isValidForm()) {
          // проверяет саму форму на валидность
          return;
        }
        const doctor = await saveDoctor(saveForm as Person); // сохранение на сервер, используя HTTP API при помощи Axios
        console.log(doctor);
        await router.push("/login");
      } catch (err) {
        if (instanceOfErrorResponse(err)) {
          const response = err.response?.data as ErrorResponse;
          const errorMessage = response.message;
          setErrors(errorMessage);
        } else {
          error.value = true;
        }
      } finally {
        isLoading.value = false;
      }
    };

    function setErrors(errorMessage: string | undefined) {
      if (errorMessage?.includes("LOGIN")) {
        loginError.value = true;
      } else if (errorMessage?.includes("EMAIL")) {
        emailError.value = true;
      } else if (errorMessage?.includes("PHONE")) {
        phoneError.value = true;
      }
    }

    function instanceOfErrorResponse(data: any): data is AxiosError {
      return "response" in data;
    }

    function validateForm() {
      const loginRegex = /^[a-zA-z0-9]{6,12}$/;
      saveFormErrors.loginError = !loginRegex.test(saveForm.person.login);

      const passwordRegex =
        // /^(?=.{12,24})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=_]).*$/;
        /^(?=.{1,24}).*$/;
      saveFormErrors.passwordError = !passwordRegex.test(
        saveForm.person.password
      );

      const emailRegex = /^(.+)@(.+){2,}\.(.+){2,}$/;
      saveFormErrors.emailError = !emailRegex.test(saveForm.person.email);

      const lastNameRegex =
        /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ-]{2,50}$/;
      saveFormErrors.lastNameError = !lastNameRegex.test(
        saveForm.person.lastName
      );

      const firstNameRegex =
        /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ-]{2,50}$/;
      saveFormErrors.firstNameError = !firstNameRegex.test(
        saveForm.person.firstName
      );

      const middleNameRegex =
        /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ-]{2,50}$/;
      saveFormErrors.middleNameError = !middleNameRegex.test(
        saveForm.person.middleName
      );

      saveFormErrors.birthDateError = saveForm.person.birthDate === null;

      const phoneRegex = /^[+]7[0-9]{10}$/;
      saveFormErrors.phoneError = !phoneRegex.test(saveForm.person.phone);

      const snilsRegex = /^[0-9]{11}$/;
      saveFormErrors.snilsError = !snilsRegex.test(saveForm.person.snils);
    }

    function isValidForm() {
      return (
        !saveFormErrors.loginError &&
        !saveFormErrors.passwordError &&
        !saveFormErrors.emailError &&
        !saveFormErrors.lastNameError &&
        !saveFormErrors.firstNameError &&
        !saveFormErrors.middleNameError &&
        !saveFormErrors.birthDateError &&
        !saveFormErrors.phoneError &&
        !saveFormErrors.snilsError
      );
    }

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

    // async function saveDoctorForm() {
    //   // логика сохранения доктора на сервер
    //   closeModal();
    // }

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
      loginError,
      emailError,
      phoneError,
      isLoading,
      register,
      formatDate,
      // saveFormDoctor,
      saveFormErrors,
      calendarDateFormat,
      calendarDateInputOptions,
      passwordType,
      openOrHidePassword,
      fetchData,
      doctorStore,
      showPopover,
      hidePopover,
      modalProperties,
      openModal,
      closeModal,
      saveDoctor,
      handleSaveSubmit,
      saveForm,
      // saveDoctorForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.spinner-div {
  margin-top: 200px;
}
.spinner-border {
  width: 5rem;
  height: 5rem;
}
.input-group > .form-control,
.input-group > .form-floating,
.input-group > .form-select {
  margin-left: 6px;
}
.open-password-btn {
  border: 1px solid #ced4da;
}
</style>

<template>
  <h1 class="mb-5">Регистрация пациента</h1>
  <div class="container">
    <div class="div-form">
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
          <div class="invalid-feedback">Логин не может быть пустым!</div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="passwordInput" class="form-label col-sm-3 col-form-label"
          >Пароль</label
        >
        <div class="col-sm-9">
          <input
            v-model="saveForm.person.password"
            id="passwordInput"
            type="password"
            class="form-control"
            aria-describedby="passwordHelp"
            v-bind:class="{ 'is-invalid': saveFormErrors.passwordError }"
          />
          <div class="invalid-feedback">Пароль не может быть пустым!</div>
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
          <div class="invalid-feedback">Е-мейл не может быть пустым!</div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="lastNameInput" class="form-label col-sm-3 col-form-label"
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
          <div class="invalid-feedback">Фамилия не может быть пустым!</div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="firstNameInput" class="form-label col-sm-3 col-form-label"
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
          <div class="invalid-feedback">Имя не может быть пустым!</div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="middleNameInput" class="form-label col-sm-3 col-form-label"
          >Отчество</label
        >
        <div class="col-sm-9">
          <input
            v-model="saveForm.person.middleName"
            id="middleNameInput"
            type="text"
            class="form-control"
            aria-describedby="middleNameHelp"
            v-bind:class="{ 'is-invalid': saveFormErrors.middleNameError }"
          />
          <div class="invalid-feedback">Отчество не может быть пустым!</div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="birthDateInput" class="form-label col-sm-3 col-form-label"
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
            class="datepicker-invalid-feedback"
          >
            Введите дату рождения!
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
          <div class="invalid-feedback">Телефон не может быть пустым!</div>
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
          <div class="invalid-feedback">СНИЛС не может быть пустым!</div>
        </div>
      </div>
      <button class="btn btn-primary mb-5 float-end" @click="register">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { formatDate, getMaxDate, getMinDate } from "@/utils/util";
import { saveVisitor } from "@/api/http";
import { Person } from "@/models/types";
import VueDatePicker from "@vuepic/vue-datepicker";

// компонент для списка врачей
export default defineComponent({
  // ToDo переназвать все виды
  name: "RegistrationView",
  methods: { getMinDate, getMaxDate },
  components: { VueDatePicker },
  setup() {
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

    const calendarDateInputOptions = ref({
      format: "dd.MM.yyyy",
    });
    const calendarDateFormat = (date: Date) => {
      if (date) {
        return date.toLocaleDateString("ru-RU", {
          // you can use undefined as first argument
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
      return null;
    };
    const error = ref(false); // описать
    const isLoading = ref(false); // описать

    const register = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        validateForm(); // все поля формы валидируются
        if (!isValidForm()) {
          // проверяет саму форму на валидность
          return;
        }
        const visitor = await saveVisitor(saveForm as Person); // сохранение на сервер, используя HTTP API при помощи Axios
        console.log(visitor);
      } catch {
        error.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    function validateForm() {
      const loginRegex = /^[a-zA-z0-9]{6,12}$/;
      saveFormErrors.loginError = !loginRegex.test(saveForm.person.login);

      const passwordRegex =
        /^(?=.{12,24})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=_]).*$/;
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

    return {
      error,
      isLoading,
      register,
      formatDate,
      saveForm,
      saveFormErrors,
      calendarDateFormat,
      calendarDateInputOptions,
    };
  },
});

// watch(
//   () => saveForm.person.birthDate,
//   (value) => {
//     const regex = /^[0-9a-zA-Z]{6,12}$/;
//     saveFormValidationErrors.loginError = !regex.test(value);
//   }
// );

// watch(
//   [saveForm.person.login, saveForm.person.password],
//   ([newA, newB], [prevA, prevB]) => {
//     const loginRegex = /^[0-9a-zA-Z]{6,12}$/;
//     saveFormValidationErrors.value.loginError = loginRegex.test(newB);
//     console.log("login value: " + saveForm.person.login);
//     console.log(loginRegex.test(newA));
//   }
// );

// watch(
//   [
//     saveForm.person.login,
//     saveForm.person.password,
//     saveForm.person.email,
//     saveForm.person.lastName,
//     saveForm.person.firstName,
//     saveForm.person.middleName,
//     saveForm.person.birthDate,
//     saveForm.person.phone,
//     saveForm.person.snils,
//   ],
//   ([
//     loginValue,
//     passwordValue,
//     emailValue,
//     lastNameValue,
//     firstNameValue,
//     middleNameValue,
//     birthDateValue,
//     phoneValue,
//     snilsValue,
//   ]) => {
//     const loginRegex = /^[[a-zA-z][0-9]]{6,12}$/;
//     saveFormValidationErrors.value.loginError =
//       !loginRegex.test(loginValue);
//     console.log("login value: " + saveForm.person.login);
//     console.log(loginRegex.test(loginValue));
//
//     const passwordRegex =
//       /^(?=.{12,24})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=_]).*$/;
//     saveFormValidationErrors.value.passwordError =
//       !passwordRegex.test(passwordValue);
//     console.log("pass value: " + saveForm.person.password);
//     console.log(passwordRegex.test(passwordValue));
//
//     const emailRegex = /^(.+)@(.+){2,}\.(.+){2,}$/;
//     saveFormValidationErrors.value.emailError =
//       !emailRegex.test(emailValue);
//
//     const lastNameRegex =
//       /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ-]{2,50}$/;
//     saveFormValidationErrors.value.lastNameError =
//       !lastNameRegex.test(lastNameValue);
//
//     const firstNameRegex =
//       /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ-]{2,50}$/;
//     saveFormValidationErrors.value.firstNameError =
//       !firstNameRegex.test(firstNameValue);
//
//     const middleNameRegex =
//       /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ-]{2,50}$/;
//     saveFormValidationErrors.value.middleNameError =
//       !middleNameRegex.test(middleNameValue);
//
//     console.log("BIRTHDATE VALUE: " + birthDateValue);
//     saveFormValidationErrors.value.birthDateError =
//       birthDateValue === undefined;
//
//     const phoneRegex = /^[+]7[0-9]{10}$/;
//     saveFormValidationErrors.value.phoneError =
//       !phoneRegex.test(phoneValue);
//
//     const snilsRegex = /^[0-9]{11}$/;
//     saveFormValidationErrors.value.snilsError =
//       !snilsRegex.test(snilsValue);
//   },
//   { immediate: true }
// );

// function isValidSaveForm() {
//   return (
//     !saveFormValidationErrors.value.loginError &&
//     !saveFormValidationErrors.value.passwordError &&
//     !saveFormValidationErrors.value.emailError &&
//     !saveFormValidationErrors.value.lastNameError &&
//     !saveFormValidationErrors.value.firstNameError &&
//     !saveFormValidationErrors.value.middleNameError &&
//     !saveFormValidationErrors.value.birthDateError &&
//     !saveFormValidationErrors.value.phoneError &&
//     !saveFormValidationErrors.value.snilsError
//   );
// }
</script>

<style lang="scss">
.container {
}
.div-form {
  width: 50%;
  margin-right: auto;
  margin-left: auto;
}
.col-form-label {
  text-align: left;
}
.invalid-feedback {
  text-align: left;
}
.dp-custom-input {
  box-shadow: none;
  border-radius: 6px;
}
.dp__input_valid {
  border: 1px solid #ced4da;
  &:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  &:hover {
    border-color: #ced4da;
  }
}
.dp__input_invalid {
  border: 1px solid #dc3545;
  &:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
  }
}
.datepicker-invalid-feedback {
  text-align: left;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>

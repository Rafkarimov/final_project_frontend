<template>
  <h1 class="mb-5">Логин в систему</h1>
  <div class="container">
    <div class="mb-3">
      <label for="loginInput" class="form-label col-form-label">Логин</label>
      <div>
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
    <div class="mb-3">
      <label for="passwordInput" class="form-label col-form-label"
        >Пароль</label
      >
      <div>
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
    <div class="mb-4">
      <a class="fw-bold" href="/registration">Регистрация</a>
    </div>
    <button class="btn btn-primary" @click="login">Войти</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { formatDate } from "@/utils/util";

// компонент для списка врачей
export default defineComponent({
  name: "LoginView",
  setup() {
    const saveForm = reactive({
      person: {
        login: "",
        password: "",
      },
    });

    const saveFormErrors = reactive({
      loginError: false,
      passwordError: false,
    });

    const error = ref(false); // описать
    const isLoading = ref(false); // описать

    const login = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        validateForm();
        console.log("Form valid?: " + isValidForm());
        // логин на сервер, используя HTTP API при помощи Axios
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
    }

    function isValidForm() {
      return !saveFormErrors.loginError && !saveFormErrors.passwordError;
    }

    return {
      error,
      isLoading,
      formatDate,
      saveForm,
      saveFormErrors,
      login,
    };
  },
});
</script>

<style lang="scss" scoped></style>

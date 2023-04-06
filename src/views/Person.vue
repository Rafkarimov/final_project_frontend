<template>
  <h1 class="mb-5">Persons</h1>
  <button class="btn btn-primary mb-5" @click="fetchData">Show persons</button>
  <div class="container">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Login</th>
          <th>Last name</th>
          <th>First name</th>
          <th>Middle name</th>
          <th>Birth date</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Snils</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in personStore.getPersons" :key="person.id">
          <td>{{ person.id }}</td>
          <td>{{ person.login }}</td>
          <td>{{ person.lastName }}</td>
          <td>{{ person.firstName }}</td>
          <td>{{ person.middleName }}</td>
          <td>{{ person.birthDate }}</td>
          <td>{{ person.phone }}</td>
          <td>{{ person.email }}</td>
          <td>{{ person.snils }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { usePersonStore } from "@/store/person";
import { getPersons } from "@/api/http";

// компонент для списка зарегистрированных пользователей
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Person",
  setup() {
    const error = ref(false); // описать
    const isLoading = ref(false); //описать
    const personStore = usePersonStore(); // описать
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const persons = await getPersons(); // вызов HTTP API при помощи Axios
        console.log(persons); // описать
        personStore.setPersons(persons); // сохранение в хранилище Vue
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
      personStore,
    };
  },
});
</script>

<style scoped></style>

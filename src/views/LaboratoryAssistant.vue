<template>
  <h1 class="mb-5">LaboratoryAssistants</h1>
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
          <th>Исследования</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="laboratoryassistant in laboratoryAssistantStore.getLaboratoryAssistants"
          :key="laboratoryassistant.id"
        >
          <td>{{ laboratoryassistant.id }}</td>
          <td>{{ laboratoryassistant.person.lastName }}</td>
          <td>{{ laboratoryassistant.person.firstName }}</td>
          <td>{{ laboratoryassistant.person.middleName }}</td>
          <td>{{ formatDate(laboratoryassistant.person.birthDate) }}</td>
          <td>{{ laboratoryassistant.person.phone }}</td>
          <td>{{ laboratoryassistant.person.email }}</td>
          <td>{{ getMedSpecializationTypes(laboratoryassistant.id) }}</td>

          <!--          <p>-->
          <!--            Вид исследования:-->
          <!--            <a-->
          <!--              data-bs-toggle="collapse"-->
          <!--              :href="`#collapse3-${laboratoryassistant.id}`"-->
          <!--              aria-expanded="false"-->
          <!--              :aria-controls="`collapse3-${laboratoryassistant.id}`"-->
          <!--            >-->
          <!--              {{ getMedSpecializationTypes(laboratoryassistant.id) }}-->
          <!--            </a>-->
          <!--          </p>-->
          <!--          <div class="collapse" :id="`collapse3-${laboratoryassistant.id}`">-->
          <!--            <div class="card card-body mb-3">-->
          <!--              {{ getMedSpecializationTypesDic(laboratoryassistant.id) }}-->
          <!--            </div>-->
          <!--          </div>-->
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
// компонент для лаборантов
import { defineComponent, onMounted, ref } from "vue";
import { useLaboratoryAssistantStore } from "@/store/laboratoryassistant";
import { getLaboratoryAssistants } from "@/api/http";
import { storeToRefs } from "pinia";
import { formatDate } from "@/utils/util";

export default defineComponent({
  name: "LaboratoryAssistant",
  // methods: { formatDate },
  setup() {
    const error = ref(false);
    const isLoading = ref(true);
    const laboratoryAssistantStore = useLaboratoryAssistantStore();
    const { getMedSpecializationTypes } = storeToRefs(laboratoryAssistantStore); // объект с ссылками на состояние геттеров итд в хранилище
    const { getMedSpecializationTypesDic } = storeToRefs(
      laboratoryAssistantStore
    ); // объект с ссылками на состояние геттеров итд в хранилище

    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const laboratoryAssistants = await getLaboratoryAssistants(); // вызов HTTP API при помощи Axios
        console.log(laboratoryAssistants);
        laboratoryAssistantStore.setLaboratoryAssistants(laboratoryAssistants); // сохранение в хранилище Vue
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
      laboratoryAssistantStore,
      getMedSpecializationTypes,
      formatDate,
      getMedSpecializationTypesDic,
    };
  },
});
</script>

<style scoped></style>

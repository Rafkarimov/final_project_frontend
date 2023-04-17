<template>
  <h1 class="mb-5">Приёмы</h1>
  <div class="container mb-5">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary mb-5"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Create new
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h1>{{ x }}</h1>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" @click="transformX" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="card text-dark bg-light mb-2"
      v-for="reception in receptionsStore.getReceptions"
      :key="reception.id"
    >
      <div class="card-body">
        <p class="card-title"><b>Пациент</b></p>
        <p class="card-text">
          {{ reception.visitor?.person?.lastName }}
          {{ reception.visitor?.person?.firstName }}
          {{ reception.visitor?.person?.middleName }}<br />
          Дата рождения:
          {{ formatDate(reception.visitor?.person?.birthDate) }}
        </p>
        <hr />
        <p class="card-title"><b>Врач</b></p>
        <p class="card-text">
          {{ reception.doctor?.person?.lastName }}
          {{ reception.doctor?.person?.firstName }}
          {{ reception.doctor?.person?.middleName }}
        </p>
        <p>
          Специализация:
          <a
            data-bs-toggle="collapse"
            :href="`#collapse2-${reception.id}`"
            aria-expanded="false"
            :aria-controls="`collapse2-${reception.id}`"
          >
            {{ reception.doctor?.medSpecialization?.title }}
          </a>
        </p>
        <div class="collapse" :id="`collapse2-${reception.id}`">
          <div class="card card-body mb-3">
            {{ reception.doctor?.medSpecialization?.description }}
          </div>
        </div>
        <p>
          <b>Дата и время приёма:</b>
          {{ formatDateTime(reception?.receptionDateTime) }}
        </p>
        <p>
          <b>Статус приёма:</b>
          {{ reception.receptionStatus?.status }}
        </p>
        <hr />
        <button class="btn btn-success">Edit</button>
        <button class="btn btn-danger ms-2">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useReceptionStore } from "@/store/reception";
import { getReceptions } from "@/api/http";
import { formatDate, formatDateTime } from "@/utils/util";

// компонент для приемов
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Reception",
  setup() {
    const error = ref(false);
    const isLoading = ref(true);
    const receptionsStore = useReceptionStore();
    const x = ref("lalala");
    // function transformX() {
    //   x.value = x.value.toUpperCase();
    //   console.log(x.value);
    // }
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const receptions = await getReceptions(); //вызов HTTP API при помощи Axios
        console.log(receptions);
        receptionsStore.setReceptions(receptions); //сохранение в хранилище Vue
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
      receptionsStore,
      formatDate,
      formatDateTime,
      x,
      // transformX,
    };
  },
});
</script>

<style scoped></style>

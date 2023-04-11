<template>
  <h1 class="mb-5">Исследование пациентов</h1>
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
      v-for="visitorresearch in visitorResearchStore.getVisitorsResearch"
      :key="visitorresearch.id"
    >
      <div class="card-body">
        <p class="card-title"><b>Пациент</b></p>
        <p class="card-text">
          {{ visitorresearch.visitor?.person?.lastName }}
          {{ visitorresearch.visitor?.person?.firstName }}
          {{ visitorresearch.visitor?.person?.middleName }}<br />
          Дата рождения:
          {{ formatDate(visitorresearch.visitor?.person?.birthDate) }}
        </p>
        <hr />
        <p class="card-title"><b>Специалист, направивший на исследование</b></p>
        <p class="card-text">
          {{ visitorresearch.doctor?.person?.lastName }}
          {{ visitorresearch.doctor?.person?.firstName }}
          {{ visitorresearch.doctor?.person?.middleName }}
        </p>
        <p>
          Специализация:
          <a
            data-bs-toggle="collapse"
            :href="`#collapse2-${visitorresearch.id}`"
            aria-expanded="false"
            :aria-controls="`collapse2-${visitorresearch.id}`"
          >
            {{ visitorresearch.doctor?.medSpecialization?.title }}
          </a>
        </p>
        <div class="collapse" :id="`collapse2-${visitorresearch.id}`">
          <div class="card card-body mb-3">
            {{ visitorresearch.doctor?.medSpecialization?.description }}
          </div>
        </div>
        <p>
          <b>Дата направления на исследование:</b>
          {{ formatDate(visitorresearch.dateOfReferralForResearch) }}
        </p>
        <p class="card-title"><b>Лаборант</b></p>
        <p class="card-text">
          {{ visitorresearch.laboratoryAssistant?.person?.lastName }}
          {{ visitorresearch.laboratoryAssistant?.person?.firstName }}
          {{ visitorresearch.laboratoryAssistant.person.middleName }}
        </p>
        <p>
          Вид исследования:
          <a
            data-bs-toggle="collapse"
            :href="`#collapse1-${visitorresearch.id}`"
            aria-expanded="false"
            :aria-controls="`collapse1-${visitorresearch.id}`"
          >
            {{ visitorresearch.medTypesOfResearch?.title }}
          </a>
        </p>
        <div class="collapse" :id="`collapse1-${visitorresearch.id}`">
          <div class="card card-body mb-3">
            {{ visitorresearch.medTypesOfResearch?.description }}
          </div>
        </div>
        <p>
          <b>Дата исследования:</b>
          {{ formatDate(visitorresearch.dateOfResearch) }}
        </p>
        <p>
          <b>Статус исследования:</b>
          {{ visitorresearch.researchStatus?.status }}
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
import { useVisitorResearchStore } from "@/store/visitorresearch";
import { getVisitorsResearch } from "@/api/http";
import { formatDate } from "@/utils/util";

// компонент для исследований посетителей
export default defineComponent({
  name: "VisitorResearch",
  setup() {
    const error = ref(false);
    const isLoading = ref(true);
    const visitorResearchStore = useVisitorResearchStore();
    const x = ref("lalala");
    function transformX() {
      x.value = x.value.toUpperCase();
      console.log(x.value);
    }
    const fetchData = async () => {
      error.value = false;
      isLoading.value = true;
      try {
        const visitorsResearch = await getVisitorsResearch(); // вызов HTTP API при помощи Axios
        console.log(visitorsResearch);
        visitorResearchStore.setVisitorsResearch(visitorsResearch); // сохранение в хранилище Vue
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
      visitorResearchStore,
      formatDate,
      x,
      transformX,
    };
  },
});
</script>

<style scoped>
/*.card-body {*/
/*  background-color: lightblue;*/
/*}*/
</style>

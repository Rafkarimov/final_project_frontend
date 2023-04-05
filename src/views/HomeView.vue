<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <MedSpecialization />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/views/HelloWorld.vue";
import MedSpecialization from "@/views/MedSpecialization.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    MedSpecialization,
    HelloWorld,
  },
});
</script>

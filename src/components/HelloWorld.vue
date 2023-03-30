<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ count }}</h1>
    <button @click="decrement">Decrease count</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { mapMutations, useStore } from "vuex";
import store from "@/store";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);
    return {
      count,
    };
  },
  methods: {
    ...mapMutations(["decrement"]),
    decrement() {
      store.commit("decrement");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

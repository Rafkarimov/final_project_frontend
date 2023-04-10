<!-- Стартовая страница -->
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/medspecializations">Специализация</router-link> |
    <router-link to="/persons">Пользователи</router-link> |
    <router-link to="/doctors">Врачи</router-link> |
    <router-link to="/chiefdoctors">Главный врач</router-link> |
    <router-link to="/visitors">Пациенты</router-link> |
    <router-link to="/medtypesofresearch">Исследования</router-link> |
    <router-link to="/laboratoryassistant">Лаборанты</router-link> |
    <router-link to="/visitorresearch">Исследования пациентов</router-link> |
    <router-link to="/reception">Приёмы</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #72c9a1;
}
</style>
<script setup lang="ts"></script>

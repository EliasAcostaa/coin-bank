<template>
  <div v-if="store.isLogged">
    <NavBar/>
    <router-view/>
  </div>
  <div v-else>
    <router-view :to="{name: 'LoginView'}"></router-view>
  </div>
  
</template>

<script setup>
  import { useUserStore } from './store/User';
  import NavBar from './components/NavBarComponent.vue';
  const store = useUserStore();
</script>


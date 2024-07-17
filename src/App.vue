<template>
  <div v-if="store.isLogged">
    <NavBar/>
    <router-view/>
  </div>
  <div v-else>
    <LoginNavBar/>
    <router-view/>
  </div>
  <MainFooter/> 
</template>

<script setup>
  import { useUserStore } from './store/User';
  import NavBar from './components/NavBarComponent.vue';
  import MainFooter from './components/MainFooterComponent.vue';
  import LoginNavBar from './components/LoginNavBarComponent.vue';
  const store = useUserStore();
</script>


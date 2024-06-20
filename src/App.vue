<template>
  <div v-if="store.isLogged">
    <nav>
      <router-link :to="{name: 'HomeView'}">home</router-link>
      <router-link :to="{name: 'VenderView'}">vender</router-link>
    </nav>
    <router-view/>
  </div>
  <div v-else>
    <router-view :to="{name: 'LoginView'}"></router-view>
  </div>
  
</template>

<script setup>
  import { useUserStore } from './store/User';
  const store = useUserStore();
</script>

<style lang="scss">

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

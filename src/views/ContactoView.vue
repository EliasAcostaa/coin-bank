<template>
    
<nav class="navbar">
  <div class="container"> 

    <router-link :to="{name: 'LoginView'}" class="navbar-brand">
      <img src="../assets/imagenes/home.png" alt="Home" width="40" height="40">
    </router-link>

    <router-link :to="{name: 'SobreNosotrosView'}" class="navbar-brand">
      <img src="../assets/imagenes/contact-us.png" alt="SobreNosotros" width="40" height="40">
    </router-link>  <!--queda mal o bien?-->
    
  </div>
</nav>



 <h2>Escribir info de contacto</h2>




</template>



<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

</script>


<style scoped>

.navbar {
    margin-top: 2rem;
    background-color: white;
}

</style>
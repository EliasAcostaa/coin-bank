<template>
    

<nav class="navbar">
  <div class="container"> 

    <router-link :to="{name: 'LoginView'}" class="navbar-brand">
      <img src="../assets/imagenes/home.png" alt="Home" width="40" height="40">
    </router-link>

    <router-link :to="{name: 'ContactoView'}" class="navbar-brand">
      <img src="../assets/imagenes/contact-us.png" alt="Contacto" width="40" height="40">
    </router-link>
    
  </div>
</nav>


<h2 class="text-center">Sobre Nosotros</h2> 

<div id="carouselExampleInterval" class="opacity-70 carousel slide" data-bs-ride="carousel">
  <div style="margin-top: 1rem; margin-bottom: 1rem;" class="carousel-inner">

    <div class="carousel-item active" data-bs-interval="10000">
      <img style="height: 650px; width: 1700px;" src="../assets/imagenes/pajaro.png" class="img-responsive" alt="img">
      <div class="carousel-caption d-sm d-md-block">
        <p class="descripcion">Ofrecemos un servicio amigable, cuyo propósito está enfocado en el manejo de monedas virtuales, facilitando a la par la compra, venta y tenencia de criptomonedas y activos digitales.</p>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="2000"> <!-- cambiar imagen/crear logo con resolucion ADECUADA -->
      <img style="height: 650px; width: 1700px;" src="../assets/imagenes/pexels-fauxels-3183132.jpg" class="img-responsive" alt="img"> 
    </div>

    <div class="carousel-item">
      <img style="height: 650px; width: 1700px;" src="../assets/imagenes/reloj.avif" class="img-responsive" alt="img">
    </div>

  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>

  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

</template>


<script setup>

import { useUserStore } from '../store/User';
    import { useRouter } from 'vue-router';

    const store = useUserStore();
    const router = useRouter();

</script>



<style scoped>

.descripcion {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  font-style: italic;
}

.navbar {
    margin-top: 2rem;
    background-color: white;
}

h2 {
  margin: 5rem;
}

</style>
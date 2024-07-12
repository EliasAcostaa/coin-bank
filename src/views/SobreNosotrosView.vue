<template>
    

<nav v-if="!store.isLogged" class="navbar">
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
      <img style="height: 650px; width: 1700px;" src="../assets/imagenes/fondo2.png" class="img-responsive" alt="img"> 
      <div class="carousel-caption d-sm d-md-block">
        <p class="descripcion2">
          ¡Ahora las transacciones son más rápidas y económicas! Nos manejamos con mejores tarifas y 
          regulaciones que los sistemas financieros tradicionales. 
          Utilizamos tecnología de cadena de bloques para proteger las transacciones y 
          garantizar su seguridad. Un sistema resistente a la falsificación y 
          manipulación. Además, vas a tener un control total sobre tus criptomonedas, sin necesidad de 
          depender de bancos u otras instituciones financieras.
        </p>
      </div>
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


<!-- ICONOS -->

<section>

  <h1 class="text-center">Conectate al futuro de las finanzas con redes de pago innovadoras. Sé creativo. No tengas miedo de pensar fuera de la caja.</h1>

  <h2 class="text-center">Nuestros servicios</h2>

</section>

<div class="servicios"> 
  <section class="servicio"> 
    <h3>Diseño Web</h3>
    <div class="iconos">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brush" width="56" height="56" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
        <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
        <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
        <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
      </svg>
    </div>

    <p>Ofrecemos un servicio amigable, cuyo propósito está enfocado en el manejo de monedas virtuales, facilitando a la par la compra, venta y tenencia de criptomonedas y activos digitales.</p>
          
  </section>

  <section class="servicio">
  <h3>Aplicaciones Web</h3>
    <div class="iconos">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="56" height="56" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M14 7l6 0" />
        <path d="M17 4l0 6" />
      </svg>
            
    </div>

    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptas blanditiis nostrum fuga aspernatur.</p>

  </section>

  <section class="servicio">
    <h3>E-Commerce</h3>
      <div class="iconos">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-bag" width="56" height="56" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
          <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
        </svg>

      </div>

    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptas blanditiis nostrum fuga aspernatur.</p>

  </section>

</div>


</template>



<script setup>

import { useUserStore } from '../store/User';
    import { useRouter } from 'vue-router';

    const store = useUserStore();
    const router = useRouter();

</script>



<style scoped>


/*servicios editados con Grid*/

@media (min-width: 768px) {
    .servicios{
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    column-gap: 3rem;
    margin: 2rem;
    }
}

.servicio {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.servicio h3 {
    color: #000000;
    font-weight: 400rem;
    margin-bottom: 3rem;
}

.servicio p {
    line-height: 2;
    text-align: center;
    margin-top: 3rem;
}

.servicio .iconos {
  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-duration: 3s;
  background:linear-gradient(141deg, #fce6ac 25%, #eee 40%, #fce6ac 45%);
  padding-top:23vh;
  height:50vh;
  border-radius: 100%;
}

@keyframes slidein {
  from {
    margin-left: 30%;
    width: 100%;
  }

  to {
    margin-left: 100%;
    width: 100%;
  }
}




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

h1 {
  animation: showup 6s infinite;
  background:linear-gradient(141deg, #fce6ac 25%, #eee 40%, #fce6ac 45%);
  color:#a0812c;
  font-family:'Roboto';
  font-weight:400;
  font-size:32px;
  padding-top:35vh;
  height:80vh;
  overflow:hidden;
}

@keyframes showup {
    0% {opacity:0;}
    20% {opacity:1;}
    80% {opacity:1;}
    100% {opacity:0;}
}

@keyframes slidein {
    0% { margin-left:-800px; }
    20% { margin-left:-800px; }
    35% { margin-left:0px; }
    100% { margin-left:0px; }
}

@keyframes reveal {
    0% {opacity:0;width:0px;}
    20% {opacity:1;width:0px;}
    30% {width:355px;}
    80% {opacity:1;}
    100% {opacity:0;width:355px;}
}

</style>
<template>


<section>
<h1 class="text-center">Conectate al futuro de las finanzas con redes de pago innovadoras. No tengas miedo de pensar fuera de la caja.</h1>
</section>



<h2 class="text-center">Sobre Nosotros</h2> 
<h3 class="text-center descripcion">Ofrecemos un servicio amigable, cuyo propósito está enfocado en el manejo de
   monedas virtuales, facilitando a la par la compra, venta y tenencia de criptomonedas y activos digitales.</h3>
     
<h4 class="text-center descripcion2">
  ¡Ahora las transacciones son más rápidas y económicas! Nos manejamos con mejores tarifas y 
  regulaciones que los sistemas financieros tradicionales. 
  Utilizamos tecnología de cadena de bloques para proteger las transacciones y 
  garantizar su seguridad. Un sistema resistente a la falsificación y 
  manipulación. Además, vas a tener un control total sobre tus criptomonedas, sin necesidad de 
  depender de bancos u otras instituciones financieras.
</h4>

<h3 class="text-center descripcion3">Somos dos programadores entusiastas. Bienvenidos a nuestro proyecto de criptomonedas.</h3>


<!-- ICONOS -->


<div class="servicios"> 
  <section class="servicio"> 
    <h3>Acceso global</h3>
    <div class="iconos">
      <img src="../assets/imagenes/google-earth.png" width="100">
    </div>

    <p>
      El mercado de criptomonedas es global y opera las 24 horas del día, los 7 días de la semana. 
      ¡Te integramos al mercado desde cualquier parte del mundo, en cualquier momento, a tu horario adecuado!
    </p>
          
  </section>

  <section class="servicio">
  <h3>Control y comodidad</h3>
    <div class="iconos">
      <img src="../assets/imagenes/casa.png" width="90">
    </div>

    <p>
      ¡Tenés la posibilidad de manejar tus inversiones como vos querés! No necesitás de bancos o corredores de 
      bolsa para comprar, vender o intercambiar criptomonedas. Nosotros hacemos el trabajo por vos.
    </p>

  </section>

  <section class="servicio">
    <h3>Alto potencial</h3>
      <div class="iconos">
        <img src="../assets/imagenes/crecen-las-criptomonedas.png" width="90">
      </div>

    <p>Te ofrecemos emplear monedas populares como Bitcoin, criptomoneda pionera y con mayor capitalización de 
      mercado; o Ethereum, líder para contratos inteligentes y aplicaciones descentralizadas.
    </p>

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
  animation-name: rotate;
  animation-iteration-count: infinite;
  animation-duration: 7s;
  background:linear-gradient(141deg, #fcca41 25%, #ffe676 40%, #fcca41 45%);
  border-radius: 100rem;
  height: 15rem;
  width: 15rem;
  border-radius: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}




.descripcion {
  font-size: 1.8rem;
  font-style:oblique;
  margin-bottom: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
  color:#af7a07;
}

.descripcion2 {
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 4rem;
  padding-left: 6rem;
  padding-right: 6rem;
}

.navbar {
    margin-top: 2rem;
    background-color: white;
}

h2 {
  margin: 5rem;
}

h1 {
  animation: showup 7s infinite;
  background:linear-gradient(141deg, #fcca41 25%, #ffe676 40%, #fcca41 45%);
  color:#b16e09;
  font-family:'Roboto';
  font-weight:400;
  font-size:32px;
  padding-top:35vh;
  height:80vh;
  overflow:hidden;
  margin-top: 5rem;
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

.descripcion,
.descripcion2 {
  animation: slidein 8s;
  font-family:'Roboto';
  font-weight:400;
  overflow:hidden;
  animation-iteration-count: 1;
}

.descripcion3 {
  margin-top: 4rem;
  margin-bottom: 8rem;
}

</style>
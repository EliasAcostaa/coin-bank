<template>
    
<nav class="navbar">
  <div class="container"> 

    <router-link :to="{name: 'LoginView'}" class="navbar-brand">
      <img src="../assets/imagenes/home.png" alt="Home" width="40" height="40">
    </router-link>

    <router-link :to="{name: 'SobreNosotrosView'}" class="navbar-brand">
      <img src="../assets/imagenes/contact-us.png" alt="SobreNosotros" width="40" height="40">
    </router-link>  
    
  </div>
</nav>



<h2 class="text-center">¡Envianos tu consulta!</h2>
<h4 class="text-center">Te escuchamos para poder mejorar tu experiencia en Coin Bank.</h4>

<div style="padding: 1rem;" class="contorno">

  <form class="row g-4">
  
    <div class="col-lg-6">
       <label class="form-label">Nombre</label>
       <input class="form-control form-control-lg" type ="text" placeholder="Su nombre">
    </div>

    <div class="col-lg-6">
      <label class="form-label">Teléfono</label>
      <input class="form-control form-control-lg" type ="tel" placeholder="Su teléfono">
    </div>

    <div class="col-12">
      <label class="form-label">Correo electrónico</label>
      <input class="form-control form-control-lg" type="email" placeholder="Su email">
    </div>

    <div class="col-12">
      <label>Mensaje</label>
      <textarea rows="3" class="form-control form-control-lg"></textarea>
    </div>

    <div class="text-center">
      <input class="btn btn-warning btn-lg" type="submit" value="Enviar">
    </div>

  </form>
            
</div>




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

label {
  font-size: 1.5rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: black;
}

h2 {
  font-family: monospace;
  padding: 1rem;
}

h4 {
  padding: 1rem;
  margin-bottom: 3rem;
}

form {
  border-radius: 10px;
  box-shadow: 0 0 60px #000000;
  background-color: rgb(184, 157, 70);
  width: min( 60rem, 100% ); /*mínimo tamaño del elemento (600px)*/
  margin: 0 auto;
  padding: 2rem;
  border-radius: 1rem;
}

.btn {
  margin-top: 2rem;
  font-size: 1.5rem;
}

</style>
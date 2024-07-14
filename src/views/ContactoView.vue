<template>

<h2 class="text-center">¡Envianos tu consulta!</h2>
<h4 class="text-center">Te escuchamos para poder mejorar tu experiencia en Coin Bank.</h4>

<div style="padding: 1rem;" class="contorno">
              <!-- no se puede enviar a ambos mails??????¿¿ -->
  <form action="https://formsubmit.co/abiibar2002@gmail.com" method="POST" class="form row g-4">
  <form action="https://formsubmit.co/elias2016acosta@gmail.com" method="POST"></form>

    <div class="col-lg-6">
       <label class="form-label">Nombre</label>
       <input name="name" class="form-control form-control-lg" type ="text" placeholder="Su nombre">
    </div>

    <div class="col-lg-6">
      <label class="form-label">Teléfono</label>
      <input name="phone" class="form-control form-control-lg" type ="tel" placeholder="Su teléfono">
    </div>

    <div class="col-12">
      <label class="form-label">Correo electrónico</label>
      <input name="email" class="form-control form-control-lg" type="email" placeholder="Su email">
    </div>

    <div class="col-12">
      <label>Mensaje</label>
      <textarea name="message" rows="3" class="form-control form-control-lg"></textarea>
    </div>

    <div class="text-center">
      <input class="btn btn-outline-warning btn-lg" type="submit" value="Enviar">
    </div>


    <input type="hidden" name="_next" value=" http://localhost:8080/">
    <input type="hidden" name="_captcha" value="false">

  </form>
            
</div>


</template>




<script setup>
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/store/User';

    const store = useUserStore();
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
  color: rgb(255, 255, 255);
}

h2 {
  font-family: monospace;
  padding: 2.5rem;
}

h4 {
  padding: 1rem;
  margin-bottom: 3rem;
}

.form {
  border-radius: 10px;
  box-shadow: 0 0 60px #000000;
  background-color: rgb(17, 15, 15);
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
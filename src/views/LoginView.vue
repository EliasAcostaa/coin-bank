<template>
  <div class="home">
  <div class="row align-items-start">

    <div class="col-6">
      <div class="img-cont">
      <img class="img-fluid" alt="logo" src="../assets/logo/COIN BANK.gif">
      <div class="col">
        <h2 class="text-right font-monospace">Realizá tus cambios. Acomodá tus ganancias.</h2>
      </div>
      </div>    <!-- a la hora de calcular col-numTanto, suma de los numeros de las columnas no debe ser +12 -->
    </div>
    
    <div class="col-6">
      <h3 class="font-monospace text-center">¡Bienvenido a nuestra billetera virtual Coin Bank!</h3>
        <form>
          <div class="row">
            <label for="Usuario" class="text-center">Ingrese un nombre de usuario</label>
            <input class="input-group-text d-grid gap-2 col-4 mx-auto" type="text" id="Usuario" v-model="nombre" placeholder="Nombre de Usuario">
            <p class="alert alert-warning alert-dismissible fade show" role="alert" v-if="!validName && intento">Introduzca una contraseña de al menos seis caracteres.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              <ul>
                <li>Debe contener números.</li>
                <li>Debe contener letras.</li>
                <li>Debe contener signos de puntuación (tales como "!", "?").</li>
                <li>No puede incluir espacios.</li>
              </ul>
            </p>
          </div>
        </form>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-outline-dark" style="background-color: goldenrod" type="button" @click="ingresar()">Ingresar</button>
        </div>
    </div>

  </div>
  </div>
</template>
                    





<script setup>
  import { useUserStore } from '../store/User';
  import { useRouter } from 'vue-router';
  import { ref, computed } from 'vue';

  const store = useUserStore();
  const route = useRouter();
  const nombre = ref('');
  const intento = ref(false);
  const regex = /[a-zA-Z0-9\-_.,:;?!¡¿@]/;

  const validName = computed(() => {
    return nombre.value.trim().length > 5 &&
           !nombre.value.includes(" ") &&
            regex.test(nombre.value)
  });

  const ingresar = () => {
    intento.value = true;
    if (validName.value) {
      store.loguear(nombre.value); 
      route.push({name: 'HomeView'});
      intento.value = false;
    }
  };

//   const alertElement = document.getElementById('yourAlertId'); 

// alertElement.addEventListener('closed.bs.alert', function () {         DEJAMOS CRUCESITA?¿
//   const focusTarget = document.getElementById('focusTargetId'); 
//   focusTarget.focus();
// });


</script>





<style scoped>

img {
  width: 21rem;
  margin-top: 1rem;
}

.home {
  max-width: 850px;
  margin: auto;
  margin-top: 8rem;   /* HACER RESPONSIVO ESTE CAMBIO (mas chico, desacomodado) */
}

.col {
  align-content: center; /* contenido de bienvenido centrado */
}

button {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

input {
  margin-top: 2rem;
  width: 20rem;
}

label {
  padding: 1rem;
  margin-top: 1rem;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: bolder;
}

p {
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size:large;
  margin-top: 1rem;
}

h2 {
  margin-top: 3rem;
}

</style>
<template>

  <div class="container">

    <div class="home">

    <div class="row align-items-center">

    <div class="col-sm-6 col-lg-6">
      <div class="text-center">
        <img class="logo img-fluid" alt="logo" src="../assets/logo/COIN BANK.gif">
        <div class="col">
          <h2>Realizá tus cambios. Acomodá tus ganancias.</h2>
        </div>
      </div>    <!-- a la hora de calcular col-numTanto, suma de los numeros de las columnas no debe ser +12 -->
    </div>
    
    <div style="padding: 2rem" class="col-sm-6">
      <h3 class="text-center">¡Bienvenido a nuestra billetera virtual Coin Bank!</h3>
        <form>
          <div>
            <div class="text-center">
              <label class="form-label" for="Usuario">Ingrese un nombre de usuario</label>
              <div id="inputinfo">
                <input class="form-control text-center" type="text" id="Usuario" v-model="nombre" placeholder="Nombre de Usuario">
                <button v-if="!intento" class="btn btn-outline-warning" type="button" @click="cambiarV()"> i </button>
              </div>
            </div>
            <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="(!validName && intento) || mostrar">
              <button v-if="!intento" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="cambiarV()"></button>
              <p>Introduzca una contraseña de al menos seis caracteres.
                <ul>
                  <li>Debe contener números.</li>
                  <li>Debe contener letras.</li>
                  <li>Debe contener signos de puntuación (tales como "!", "?").</li>
                  <li>No puede incluir espacios.</li>
                </ul>
              </p>
            </div>
          </div>
        </form> 
        
        <div class="d-grid gap-2 col-6 mx-auto">       
          <button id="boton" class="btn btn-outline-dark" style="background-color: goldenrod" type="button" @click="ingresar()">Ingresar</button>
        </div>
        
      </div>

        <!-- iconos -->
      <div class="row align-items-center">
        
        <div class="col">
          <img class="img-fluid rounded mx-auto d-block" alt="image" src="../assets/imagenes/logo-Bitcoin-transparente.png">
        </div>

        <div class="col">
          <img class="img-fluid rounded mx-auto d-block" alt="image" src="../assets/imagenes/logo-Tether-transparente.png">
        </div>

        <div class="col">
          <img class="img-fluid rounded mx-auto d-block" alt="image" src="../assets/imagenes/Ethereum-Logo-1.png">
        </div>
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
  const mostrar = ref(false)
  const nombre = ref('');
  const intento = ref(false);
  const regex = /[a-zA-Z0-9\-_.,:;?!¡¿@]/;

  const validName = computed(() => {
    return nombre.value.trim().length > 5 &&
           !nombre.value.includes(" ") &&
            regex.test(nombre.value)
  });

  const cambiarV = () => {
    mostrar.value = mostrar.value ? false : true
  }

  const ingresar = () => {
    intento.value = true;
    if (validName.value) {
      store.loguear(nombre.value); 
      route.push({name: 'HomeView'});
      intento.value = false;
    }
  };


</script>




<style scoped>

.logo {
  width: 19rem;
  margin-top: 1rem;
}

img {
  width: 15rem;
}

#inputinfo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.home {
  max-width: 1000px;
  margin: auto;
  margin-top: 4rem; 
}

.col {
  align-content: center; /* contenido de bienvenido centrado */
}

button {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
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
  color: #9b7611;
}


</style>
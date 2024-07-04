<template>

  <div class="container">

    <div class="home">

    <div class="row align-items-center">

    <div class="col-sm-6 col-lg-6">
      <div class="text-center">
        <img class="logo img-fluid" alt="logo" src="../assets/logo/COIN BANK.gif">
        <div class="col">
          <h2 class="font-monospace text-sm-center">Realizá tus cambios. Acomodá tus ganancias.</h2>
        </div>
      </div>    <!-- a la hora de calcular col-numTanto, suma de los numeros de las columnas no debe ser +12 -->
    </div>
    
    <div style="padding: 2rem" class="col-sm-6">
      <h3 class="font-monospace text-center">¡Bienvenido a nuestra billetera virtual Coin Bank!</h3>
        <form>
          <div>
            <div class="text-center">
              <label class="form-label" for="Usuario">Ingrese un nombre de usuario</label>
              <div id="inputinfo">
                <input class="form-control text-center" type="text" id="Usuario" v-model="nombre" placeholder="Nombre de Usuario">
                <button v-if="!intento" class="btn btn-outline-warning" type="button" data-bs-dismiss="alert" @click="cambiarV()"> i </button>
              </div>
            </div>
            <div> <!-- alerta -->
              <p class="alert alert-warning alert-dismissible fade show" role="alert" v-if="(!validName && intento) || mostrar">Introduzca una contraseña de al menos seis caracteres.
                <button v-if="!intento" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="cambiarV()"></button>
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
        
        <div class="d-grid gap-2 col-6 mx-auto">         <!-- imagenes de logos -->
          <button class="btn btn-outline-dark" style="background-color: goldenrod" type="button" @click="ingresar()">Ingresar</button>
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


<div id="carouselExampleInterval" class="opacity-70 carousel slide" data-bs-ride="carousel">
  <div style="margin-top: 1rem; margin-bottom: 1rem;" class="carousel-inner">

    <div class="carousel-item active" data-bs-interval="10000">
      <img style="height: 650px; width: 1700px;" src="../assets/imagenes/pajaro.png" class="img-responsive" alt="img">
      <div class="carousel-caption d-sm d-md-block">
        <p class="descripcion">Ofrecemos una página amigable enfocada en el manejo de monedas virtuales, facilitando a la par la compra, venta y tenencia de criptomonedas y activos digitales.</p>
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

.container {
    max-width: 1000px; /* PROPIEDADES INFLUYEN EN TEXTO? */
    margin: auto;
    font-size: 1.2rem;
    min-width: 220px; /* medida menor a la que puede llegar la pagina Login */
}

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
  margin-top: 4rem;   /* HACER RESPONSIVO ESTE CAMBIO (mas chico, desacomodado) */
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
}

.descripcion {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  font-style: italic;
}

</style>
<template>
  <div>
    <h3>Registrese</h3>
    <form>
      <label for="Usuario">Ingrese su nombre de Usuario</label>
      <input type="text" id="Usuario" v-model="nombre" placeholder="Nombre de Usuario">
    </form>
    <p v-if="!validName && intento">Introduce una combinacion de al menos seis numeros, letras y signos de puntuacion(como ! y ?), no debe incluir espacios</p>
    <button type="button" @click="ingresar()">ingresar</button>
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
</script>
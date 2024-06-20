<template>
  <div>
    <h3>Registrese</h3>
    <form>
      <label for="Usuario">¡Ingrese su nombre de Usuario!</label>
      <input type="text" id="Usuario" v-model="nombre" placeholder="Nombre de Usuario">
    </form>
    <p v-if="!validName && intento">Introduce una contraseña de al menos seis caracteres.
      <ul>
        <li>Debe contener números</li>
        <li>Debe contener letras</li>
        <li>Debe contener signos de puntuación (tales como "!", "?")</li>
        <li>No puede incluir espacios</li>
      </ul>  
    </p>
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
      store.loguear({ ...nombre.value }); 
      route.push('/HomeView');
      intento.value = false;
    }
  };
</script>
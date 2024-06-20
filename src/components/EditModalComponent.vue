<template>
    <div v-if="visible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ Movimiento._id }}</h2>
        <p>Tipo de Transaccion: <input type="text" v-model="Movimiento.action"></p>
        <p>CriptoMoneda: <input type="text" v-model="Movimiento.crypto_code"></p>
        <p>cantidad: <input type="text" v-model="Movimiento.crypto_amount"></p>
        <p>total: $<input type="text" v-model="Movimiento.money"></p>
        <p>fecha: {{Movimiento.datetime}}</p>
        <button id="botonEditar" @click="editar">Editar</button>
        <button id="botonCerrar" @click="closeModal">Cancelar</button>
      </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits,ref } from 'vue'
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true
    },
    movimiento: {
      type: Object,
      required: true
    }
  })

  let Movimiento = ref({
    _id: props.movimiento._id,
    action: props.movimiento.action,
    crypto_code: props.movimiento.crypto_code,
    crypto_amount: props.movimiento.crypto_amount,
    money: props.movimiento.money,
    datetime: props.movimiento.datetime
  })
  
  const emitEvent = defineEmits(['update:visible', 'editMove'])

  const editar = () => {
    emitEvent('edit-move', {...Movimiento.value})
    closeModal()
  }
  
  const closeModal = () => {
    emitEvent('update:visible', false)
  }
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: rgba(161, 69, 69, 0.767);
    padding: 15px;
    border-radius: 10%;
    min-width: 300px;
    position: relative;
    border: 5px solid #000000;
    text-align: center;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: #000000;
  }

  #botonCerrar {
    color:#ffffff;
    padding: 5px;
    background-color: rgb(5, 10, 71);
    border: solid rgb(2, 2, 48);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    width: 10rem;
  }

  </style>
<template>
    <div v-if="visible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ props.movimiento._id }}</h2>
        <p>Tipo de Transaccion: {{ nombreOp(props.movimiento.action).nombre }}</p>
        <p>CriptoMoneda: {{ nombreMoneda(props.movimiento.crypto_code).nombre }}</p>
        <p>cantidad: {{ props.movimiento.crypto_amount }}</p>
        <p>total: ${{ props.movimiento.money }}</p>
        <p>fecha: {{ props.movimiento.datetime }}</p>
        <button id="botonCerrar" @click="closeModal">Cerrar</button>
      </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import GestionService from '@/Services/GestionService';

  const GestionS = new GestionService()

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

  const nombreMoneda = (codigo) => {
    return GestionS.getMonedas().find(moneda => moneda.codigo === codigo)
  }

  const nombreOp = (codigo) => {
    return GestionS.getOperaciones().find(accion => accion.opcion === codigo)
  }
  
  const emitEvent = defineEmits(['update:visible'])
  
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
    color: #ffffff;
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

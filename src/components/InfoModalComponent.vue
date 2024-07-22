<template>
    <div v-if="visible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2 class="titulo">{{ props.movimiento._id }}</h2>
        <p>Transaccion: {{ nombreOp(props.movimiento.action).nombre }}</p>
        <p>CriptoMoneda: {{ nombreMoneda(props.movimiento.crypto_code).nombre }}</p>
        <p>Cantidad: {{ props.movimiento.crypto_amount }}</p>
        <p>Total: ${{ props.movimiento.money }}</p>
        <p>Fecha: {{ props.movimiento.datetime }}</p>
        <button class="btn btn-warning" id="botonCerrar" @click="closeModal">Cerrar</button>
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: rgb(252, 252, 252);
    padding: 20px;
    max-width: 300px;
    position: relative;
    border: 2px solid #000000;
    text-align: center;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #000000;
    font-weight: bold;
  }


  .titulo {
    font-size: 1.2rem;
    font-weight: bolder;     /* num de id */
    margin-bottom: 2rem;
  }

  </style>

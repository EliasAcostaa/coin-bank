<template>
    <div v-if="visible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ Movimiento._id }}</h2>
        <div>
          <label for="accion">Tipo de Transaccion:</label>
          <select id="accion" v-model="Movimiento.action">
            <option v-for="operacion in GestionS.getOperaciones()" :key="operacion.opcion" :value="operacion.opcion">{{ operacion.nombre }}</option>
          </select>
        </div>
        <div>
          <label for="Moneda">CriptoMoneda:</label>
          <select id="Moneda" v-model="Movimiento.crypto_code">
            <option v-for="moneda in GestionS.getMonedas()" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.nombre }}</option>
          </select>
        </div>
        <div>
          <label for="Cantidad">Cantidad</label>
          <input type="number" id="Cantidad" v-model="Movimiento.crypto_amount">
        </div>
        <div>
          <p>total ar$ {{ Movimiento.money }}</p>
        </div>
        <div>
          <p>fecha: {{ formatearFecha(Movimiento.datetime) }}</p>
        </div>
        <div>
          <button id="botonEditar" @click="editar">Editar</button>
        </div>
        <div>
          <button id="botonCerrar" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import GestionService from '@/Services/GestionService';
import TransactionsService from '@/Services/TransaccionesService';

  const TransactionsS = new TransactionsService()
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

  let Movimiento = ref({
    _id: props.movimiento._id,
    crypto_code: props.movimiento.crypto_code,
    crypto_amount: props.movimiento.crypto_amount,
    money: props.movimiento.money,
    user_id: props.movimiento.user_id,
    action: props.movimiento.action,
    datetime: props.movimiento.datetime
  })

  const emitEvent = defineEmits(['update:visible', 'editMove'])

  const editar = async () => {
    let ok = false
    if(typeof Number(Movimiento.value.crypto_amount) === 'number' && Movimiento.value.crypto_amount > 0){
      if (Movimiento.value.action === 'purchase') {
        ok = true
      }else{
        const moneda = TransactionsS.getEstadoCuenta().find(coin => coin.codigo === Movimiento.value.crypto_code)
        if(Movimiento.value.crypto_amount <= moneda.balance){
          ok = true
        }else{
          console.log("el monto debe ser menor a la exitencia")
        }
      } 
    }else{
      //hacer cartel de llenar todo bien(hablar css)
      console.log("llena bien todo daleeee" )
    }

    if(ok){
      emitEvent('edit-move', {...Movimiento.value})
      closeModal()
    }else{
      console.log("los datos para modificar deben ser validos" )
    }

  }

  const updateTotal = async () => {
    if (typeof Number(Movimiento.value.crypto_amount) === 'number' && Movimiento.value.crypto_amount > 0) {
      const Cotizacion = await GestionS.getCotizacion(Movimiento.value.crypto_code);
      if (Movimiento.value.action === 'purchase') {
        Movimiento.value.money = Cotizacion.totalAsk * Movimiento.value.crypto_amount;
      } else {
        Movimiento.value.money = Cotizacion.totalBid * Movimiento.value.crypto_amount;
      }
    } else {
      Movimiento.value.money = 0;
    }
  }

  const formatearFecha = (fechaISO) =>{
    const fecha = new Date(fechaISO);

    const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    const formato = new Intl.DateTimeFormat('es-ES', opciones);
    const fechaFormateada = formato.format(fecha);

    return fechaFormateada + "hs";
  }
  
  const closeModal = () => {
    emitEvent('update:visible', false)
  }

  watch(Movimiento.value, updateTotal)
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

  input, select {
    color: #000000;
    background-color: rgba(161, 69, 69, 0.767);
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
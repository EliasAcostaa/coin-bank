<template>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
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
  </div>
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
        if(TransactionsS.getEstadoCuenta().length > 0 ){
          const moneda = TransactionsS.getEstadoCuenta().find(coin => coin.codigo === Movimiento.value.crypto_code)
          if(moneda){
            if(Movimiento.value.crypto_amount <= moneda.balance){
              ok = true
            }else{
              console.log("el monto debe ser menor a la exitencia")
            }
          }
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

  const minimo = () => {
        return Movimiento.value.crypto_amount.toFixed(6)
  }

  const updateTotal = async () => {
    if (typeof Number(Movimiento.value.crypto_amount) === 'number' && Movimiento.value.crypto_amount > 0) {
      Movimiento.value.crypto_amount = parseFloat(minimo())
      const Cotizacion = await GestionS.getCotizacion(Movimiento.value.crypto_code);
      if (Movimiento.value.action === 'purchase') {
        Movimiento.value.money = (Cotizacion.totalAsk * Movimiento.value.crypto_amount).toFixed(2);
      } else {
        Movimiento.value.money = (Cotizacion.totalBid * Movimiento.value.crypto_amount).toFixed(2);
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

  </style>
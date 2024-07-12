<template>
  
    <div v-if="visible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2 class="titulo">{{ Movimiento._id }}</h2>
        <div>
          <label class="form-label col-6" for="accion">Transacción</label>
          <select class="text-center col-5" id="accion" v-model="Movimiento.action">
            <option v-for="operacion in GestionS.getOperaciones()" :key="operacion.opcion" :value="operacion.opcion">{{ operacion.nombre }}</option>
          </select>
        </div>
        <div>
          <label class="form-label col-6" for="Moneda">CriptoMoneda</label>
          <select class="text-center col-6" id="Moneda" v-model="Movimiento.crypto_code">
            <option v-for="moneda in GestionS.getMonedas()" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.nombre }}</option>
          </select>
        </div>
        <div>
          <label class="form-label col-5" for="Cantidad">Cantidad</label>
          <input class="text-center col-5" type="number" id="Cantidad" v-model="Movimiento.crypto_amount">
        </div>
        <div class="text-center" style="margin-top: 1.5rem;">
          <p class="text-center"> Total ar$ {{ Movimiento.money }}</p>
        </div>
        <div>
          <p class="text-center" style="margin-bottom: 2rem;"> Fecha: {{ formatearFecha(Movimiento.datetime) }}</p>
        </div>

        <div class="row">
        <div class="col-6">
          <button class="btn btn-warning" id="botonEditar" @click="editar">Editar</button>
        </div>
        <div class="col-6">
          <button class="btn btn-warning" id="botonCerrar" @click="closeModal">Cancelar</button>
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

  const editar = async () => {   // error en funcion editar???¿¿¿ por que transaccion en modal genera problemas¿¿??
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
  }

  </style>
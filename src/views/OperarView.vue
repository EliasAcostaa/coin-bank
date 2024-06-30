<template>
    <div v-if="store.isLogged">
        <h3 class="text-center">¡Opere y genere movimientos dentro de su cartera!</h3>
            
        <div class="container">
            <form class="text-center">

                <div class="row mb-3">
                    <div class="d-grid gap-2 d-xxl-block">
                    <label class="col-xxl-6 col-form-label" for="TipoOperacion">Seleccione el tipo de operación </label>
                    <select class="btn btn-dark btn-lg dropdown-toggle" id="TipoOperacion" v-model="operacion.action">
                        <option v-for="operacion in GestionS.getOperaciones()" :key="operacion.opcion" :value="operacion.opcion">{{ operacion.nombre }}</option>
                    </select>
                    </div>
                </div>

                <div class="row mb-3">  
                    <div class="d-grid gap-2 d-xxl-block">    <!-- quitar el "d-" y "block" ???¿¿¿ -->
                    <label class="col-xxl-5 col-form-label" for="Moneda">Seleccione una moneda </label>
                        <select class="btn btn-dark btn-lg dropdown-toggle" id="Moneda" v-model="operacion.crypto_code">
                            <option v-for="moneda in GestionS.getMonedas()" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.nombre }}</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="d-grid gap-2 d-xxl-block">
                        <label class="col-xxl-3 col-form-label" for="Cantidad">Cantidad </label>
                        <input class="btn btn-dark btn-lg" type="number" id="Cantidad" min="0.000001" v-model="operacion.crypto_amount">
                    </div>
                </div>

                <div class="row mb-3">
                    <p class="col-xxl-12 col-form-label text-center fs-3">Total ar$ {{ operacion.money }}</p>
                </div>

                <div class="row mb-3">
                    <div class="d-grid gap-2 d-xxl-block">
                        <label class="col-xxl-2 col-form-label" for="Fecha">Fecha </label>
                        <input class="btn btn-dark btn-lg" type="date" id="Fecha" v-model="date.fecha" :max="todayString">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="d-grid gap-2 d-xxl-block">
                        <label class="col-xxl-2 col-form-label" for="Hora">Hora </label>
                        <input class="btn btn-dark btn-lg" type="time" id="Hora" v-model="date.hora">
                    </div>
                </div>

                <div class="row">
                    <table class="text-center">
                        <h3 class="exchange text-center">Exchange actual {{ store.exchange }}</h3>
                        <PreciosTable></PreciosTable>
                    </table>
                </div>
  
                <div class="row mb-1">
                    <button class="d-grid gap-2 col-5 mx-auto btn btn-dark" @click="realizarMovimiento">{{ opp.nombre }}</button>
                </div>

            </form>
        </div>
    </div>


  </template>
  



  <script setup>
    import { useUserStore } from '@/store/User';
    import { useRouter } from 'vue-router';
    import { ref, watch, computed, onMounted} from 'vue';
  
    import GestionService from '@/Services/GestionService';
    import TransactionsService from '@/Services/TransaccionesService';
    import PreciosTable from '@/components/PreciosTable.vue'
  
    const store = useUserStore();
    const router = useRouter();
    const GestionS = new GestionService();
    const TransactionsS = new TransactionsService()
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10)

    const realizarMovimiento = async () => {
        if(typeof Number(operacion.value.crypto_amount) === 'number' && operacion.value.crypto_amount > 0){
            let resultado = ''
            if (operacion.value.action === 'purchase') {
                resultado = await TransactionsS.postMovimiento({...operacion.value})
                console.log("estatus " + resultado)
                    //hacer cartel de como salio la accion(hablar css)
            }else{
                await TransactionsS.fetchTransactions()
                if(TransactionsS.getEstadoCuenta().length > 0 ){
                    const moneda = TransactionsS.getEstadoCuenta().find(coin => coin.codigo === operacion.value.crypto_code)
                    if(moneda){
                        if(operacion.value.crypto_amount <= moneda.balance){
                            resultado = await TransactionsS.postMovimiento({...operacion.value})
                            console.log("estatus " + resultado)
                            //hacer cartel de como salio la accion(hablar css)
                        }else{
                            console.log("el monto debe ser menor a la exitencia")
                        }
                    }
                }else{
                    //hacer cartel de que se necesita tener de esa moneda para poder vender(hablar css)
                    console.log("primero debe comprar")
                }
            } 
        }else{
            //hacer cartel de llenar todo bien(hablar css)
            console.log("llena bien todo daleeee" )
        }
    }

    const minimo = () => {
        return operacion.value.crypto_amount.toFixed(6)
    }

    const opp = computed(() => {
        return GestionS.getOperaciones().find(operation => operation.opcion === operacion.value.action)
    })

    let date = ref({
        fecha: todayString,
        hora: '00:00'
    })

    const updateFecha = () => {
        const fecha = new Date(
            parseInt(date.value.fecha.slice(0,4)),
            parseInt(date.value.fecha.slice(5,7)) - 1 ,
            parseInt(date.value.fecha.slice(8,10)),
            parseInt(date.value.hora.slice(0,2)),
            parseInt(date.value.hora.slice(3,5))
        )
        operacion.value.datetime = fecha.toISOString()
        //operacion.value.datetime = `${date.value.fecha.slice(8,10)}-${date.value.fecha.slice(5,7)}-${date.value.fecha.slice(0,4)} ${date.value.hora}`;
    }

    onMounted(() => {
        if (!store.isLogged) {
            router.push({name: 'LoginView'})
        } 
        updateFecha()
    })


  
    const updateTotal = async () => {
        if (typeof Number(operacion.value.crypto_amount) === 'number' && operacion.value.crypto_amount > 0) {
            operacion.value.crypto_amount = parseFloat(minimo())
            const Cotizacion = await GestionS.getCotizacion(operacion.value.crypto_code);
            if (operacion.value.action === 'purchase') {
                operacion.value.money = (Cotizacion.totalAsk * operacion.value.crypto_amount).toFixed(2);
            } else {
                operacion.value.money = (Cotizacion.totalBid * operacion.value.crypto_amount).toFixed(2);
            }
        } else {
            operacion.value.money = 0;
        }
    };
  
    let operacion = ref({
      user_id: store.usuario,
      action: 'purchase',
      crypto_code: 'btc',
      crypto_amount: 0,
      money: 0,
      datetime: ''
    });

    watch(date.value, updateFecha)
  
    watch(operacion.value, updateTotal);

  </script>

  


<style scoped>

.container {
    max-width: 900px;
    margin: auto;
    margin-top: 3rem;   /* HACER RESPONSIVO ESTE CAMBIO (mas chico, desacomodado) */
    font-size: 1.2rem;
}


button {
    padding: 1rem;
    margin-top: 4rem;
    font-size: large;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.col-sm-4  {
    font-size: 1.3rem;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

h3 {
    margin-top: 3rem;
}

.exchange {
    margin-top: 3rem;
    margin-bottom: 4rem;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

label {
    font-size: 1.5rem;
}

/* PreciosTable es un COMPONENTE, la modificacion se realiza dentro del componente, aca no funcionará. */


</style>





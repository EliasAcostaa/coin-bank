<template>
    <div v-if="store.isLogged">
        <h3 class="text-center">¡Opere y genere movimientos dentro de su cartera!</h3>
            
        <div class="container">
            <form class="text-center">

                <h3 class="exchange">Exchange actual {{ store.exchange }}</h3>
                <div class="table-responsive">
                    <table class="table table-bordered-dark table-striped small">
                        <PreciosTable></PreciosTable>
                    </table>
                </div>

                <div class="row mb-3">
                    <div class="d-grid gap-2 d-xxl">
                    <label class="col-xxl-12 col-form-label" for="TipoOperacion">Seleccione el tipo de operación </label>
                    <select class="btn btn-dark btn-lg dropdown-toggle" id="TipoOperacion" v-model="operacion.action">
                        <option v-for="operacion in GestionS.getOperaciones()" :key="operacion.opcion" :value="operacion.opcion">{{ operacion.nombre }}</option>
                    </select>
                    </div>
                </div>

                <div class="row mb-3">  
                    <div class="d-grid gap-2 d-xxl">    
                    <label class="col-xxl-12 col-form-label" for="Moneda">Seleccione una moneda </label>
                        <select class="btn btn-dark btn-lg dropdown-toggle" id="Moneda" v-model="operacion.crypto_code">
                            <option v-for="moneda in GestionS.getMonedas()" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.nombre }}</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="d-grid gap-2 d-xxl">
                        <label class="col-xxl-12 col-form-label" for="Cantidad">Cantidad </label>
                        <input class="btn btn-dark btn-lg" type="number" id="Cantidad" v-model="operacion.crypto_amount">
                    </div>                                           
                </div>

                <div class="row mb-3">
                    <p class="col-xxl-12 col-form-label text-center fs-3">Total ar$ {{ operacion.money }}</p>
                </div>

                <div class="row mb-3">
                    <div class="d-grid gap-2 d-xxl">
                        <label class="col-xxl-12 col-form-label" for="Fecha">Fecha </label>
                        <input class="btn btn-dark btn-lg" type="date" id="Fecha" v-model="date.fecha" :max="todayString">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="d-grid gap-2 d-xxl">
                        <label class="col-xxl-12 col-form-label" for="Hora">Hora </label>
                        <input class="btn btn-dark btn-lg" type="time" id="Hora" v-model="date.hora">
                    </div>
                </div>

                <span tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="¡Debes completar los campos antes de realizar la operación!">
                    <button type="button" class="d-grid gap-2 col-6 mx-auto btn btn-dark" @click="realizarMovimiento">{{ opp.nombre }}</button>
                </span>

                      
            </form>
        </div>           <!-- REALIZAR POPOVERS!!!!!!!!!!!!!!! ahora que esta arreglado operar-->
    </div>                              <!-- VER NAVBAR QUE APARECE MAL-->


  </template>
  



  <script setup>
    import { useUserStore } from '@/store/User';
    import { useRouter } from 'vue-router';
    import { ref, watch, computed, onMounted} from 'vue';
    import { Popover } from 'bootstrap';
  
    import GestionService from '@/Services/GestionService';
    import TransactionsService from '@/Services/TransaccionesService';
    import PreciosTable from '@/components/PreciosTable.vue'
  
    const store = useUserStore();
    const router = useRouter();
    const GestionS = new GestionService();
    const TransactionsS = new TransactionsService()
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10)

    const realizarMovimiento = async (event) => {
        event.preventDefault();         // DEBERIA ANDAE CON ESTOOOOOOOOO
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

    onMounted(() => {
        // Initialize popovers after mount
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        const popoverList = popoverTriggerList.map(popoverTrigger => new Popover(popoverTrigger))
    })

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
            operacion.value.crypto_amount = 0;
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
    max-width: 500px; 
    margin-bottom: 1.5rem;
    margin-top: 3rem;   
    min-width: 200px;
}


button {
    padding: 0.5rem;
    margin-top: 4rem;
    font-size: 1.3rem;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

h3 {
    margin-top: 3rem;
}

.exchange {
    margin-top: 1rem;
    margin-bottom: -0.5rem;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

label {
    font-size: 1.4rem;
}

.btn-dark {
    --bs-btn-bg: #000000;
}
/* PreciosTable es un COMPONENTE, la modificacion se realiza dentro del componente, aca no funcionará. */


</style>





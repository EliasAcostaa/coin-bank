<template>
    <div v-if="store.isLogged">
        <h3>Operar</h3>
        <form>
            <div>
                <label for="TipoOperacion">Seleccione el tipo de operacion</label>
                <select id="TipoOperacion" v-model="operacion.action">
                    <option v-for="operacion in GestionS.getOperaciones()" :key="operacion.opcion" :value="operacion.opcion">{{ operacion.nombre }}</option>
                </select>
            </div>
            <div>
                <label for="Moneda">Seleccione una Moneda</label>
                <select id="Moneda" v-model="operacion.crypto_code">
                    <option v-for="moneda in GestionS.getMonedas()" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.nombre }}</option>
                </select>
            </div>
            <div>
                <label for="Cantidad">Cantidad</label>
                <input type="number" id="Cantidad" v-model="operacion.crypto_amount">
            </div>
            <div>
                <p>total ar$ {{ operacion.money }}</p>
            </div>
            <div>
                <label for="Fecha">Fecha</label>
                <input type="date" id="Fecha" v-model="date.fecha" :max="todayString">
            </div>
            <div>
                <label for="Hora">Hora</label>
                <input type="time" id="Hora" v-model="date.hora">
            </div>
        </form>
        <div>
            <button @click="realizarMovimiento">{{ opp.nombre }}</button>
        </div>

    </div>
    <div v-else>
      <h3>para poder Vender y Comprar usted debe iniciar sesion</h3>
      <button @click="Login">Iniciar Sesion</button>
    </div>
  </template>
  
  <script setup>
    import { useUserStore } from '@/store/User';
    import { useRouter } from 'vue-router';
    import { ref, watch, computed, onMounted} from 'vue';
  
    import GestionService from '@/Services/GestionService';
    import TransactionsService from '@/Services/TransaccionesService';
  
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
                const moneda = await TransactionsS.getEstadoCuenta().find(coin => coin.codigo === operacion.value.crypto_code)
                if(operacion.value.crypto_amount <= moneda.balance){
                    resultado = await TransactionsS.postMovimiento({...operacion.value})
                    console.log("estatus " + resultado)
                    //hacer cartel de como salio la accion(hablar css)
                }else{
                    console.log("el monto debe ser menor a la exitencia")
                }
            } 
        }else{
            //hacer cartel de llenar todo bien(hablar css)
            console.log("llena bien todo daleeee" )
        }
    }

    const opp = computed(() => {
        return GestionS.getOperaciones().find(operation => operation.opcion === operacion.value.action)
    })

    let date = ref({
        fecha: todayString,
        hora: '00:00'
    })

    const updateFecha = () => {
        operacion.value.datetime = `${date.value.fecha.slice(8,10)}-${date.value.fecha.slice(5,7)}-${date.value.fecha.slice(0,4)} ${date.value.hora}`;
    }

    onMounted(() => {
        updateFecha()
    })
  
    const updateTotal = async () => {
        if (typeof Number(operacion.value.crypto_amount) === 'number' && operacion.value.crypto_amount > 0) {
            const Cotizacion = await GestionS.getCotizacion(operacion.value.crypto_code);
            if (operacion.value.action === 'purchase') {
                operacion.value.money = Cotizacion.totalAsk * operacion.value.crypto_amount;
            } else {
                operacion.value.money = Cotizacion.totalBid * operacion.value.crypto_amount;
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
  
    const Login = () => {
      router.push({ name: 'LoginView' });
    };

    watch(date.value, updateFecha)
  
    watch(operacion.value, updateTotal);
  </script>
<template>
    <div v-if="store.isLogged">
        <h3>Estado Actual</h3>
        <div v-if="!cargando">
            <div v-if="balances.length !== 0">
                <table>
                    <thead>
                        <tr>
                            <th>CriptoMoneda</th>
                            <th>Cantidad</th>
                            <th>Dinero</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(moneda, index) in balances" :key="index">
                            <td>{{ nombreMoneda(moneda.codigo).nombre }}</td>
                            <td>{{ moneda.balance }}</td>
                            <td>${{ precioArs(moneda) }}</td>
                        </tr>
                    </tbody>
                </table>
                <p> total de dinero en cuenta: ${{ totalFinal }}</p>
            </div>
            <div v-else>
                <p>la cuenta está vacia</p>
            </div>
        </div>
        <div v-else>
            <p>cargando Balance</p>
        </div>
    </div>
    <div v-else>
        <h3>para poder visualizar los balances usted debe iniciar sesion</h3>
        <button @click="Login()">Iniciar Sesion</button>
    </div>
    
</template>

<script setup>
    import { onMounted, ref, computed} from 'vue'
    import { useUserStore} from '@/store/User'
    import { useRouter } from 'vue-router';
    import TransactionsService from '@/Services/TransaccionesService';
    import GestionService from '@/Services/GestionService'

    let cargando = ref(true);
    let balances = ref([])
    let totales = 0
    let cotizaciones = []

    const store = useUserStore()
    const router = useRouter()
    const TransactionsS = new TransactionsService()
    const GestionS = new GestionService()
    
    onMounted(async () => {
        await recargar()
    })

    const recargar = async () => {
        try{
            cargando.value = true
            await TransactionsS.fetchTransactions()
            balances.value = TransactionsS.getEstadoCuenta().filter(moneda => moneda.balance > 0)
            for(const moneda of GestionS.getMonedas()){
                const Cotizacion = await GestionS.getCotizacion(moneda.codigo);
                cotizaciones.push({codigo: moneda.codigo, valor: Cotizacion.totalAsk})
            }
        }catch(error){
            console.log(error)
        }finally{
            cargando.value = false;
        }
    }

    const precioArs = (moneda) => {
        const cotizacion = cotizaciones.find(coin => coin.codigo === moneda.codigo)
        totales += cotizacion.valor * moneda.balance
        return cotizacion.valor * moneda.balance;
    }

    const totalFinal = computed(() => {
        return totales
    })

    const Login = () => {
        router.push({name: 'LoginView'})
    }

    const nombreMoneda = (codigo) => {
        return GestionS.getMonedas().find(moneda => moneda.codigo === codigo)
    }

</script>
<template>
    <div class="container">
    <div v-if="store.isLogged">
        <h3>Estado actual</h3>
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
                <p> Total de dinero en cuenta: ${{ totalFinal }}</p>
            </div>
            <div v-else>
                <p>¡La cuenta se encuentra vacía!</p>
            </div>
        </div>
        <div v-else>
            <p>Cargando balance, estamos trabajando...</p>
        </div>
    </div>
    <div v-else>
        <h3>Para poder visualizar los balances... ¡Debe iniciar sesión!</h3>
        <button @click="Login()">Iniciar Sesión</button>
    </div>
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
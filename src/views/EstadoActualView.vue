<template>
    <div class="container">
        <div v-if="store.isLogged">
            <h3 class="text-center">Estado actual</h3>
            <div v-if="!cargando">
                <div v-if="balances.length !== 0">
                    <div class="table-responsive">
                    <table class="table table-bordered-dark table-striped small">
                        <thead>
                            <tr class="text-center">
                                <th>CriptoMoneda</th>
                                <th>Cantidad</th>
                                <th>Dinero</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for="(moneda, index) in balances" :key="index">
                                <td>{{ nombreMoneda(moneda.codigo).nombre }}</td>
                                <td>{{ moneda.balance }}</td>
                                <td>${{ precioArs(moneda) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    <p class="total fs-4 text-center"> Total de dinero en cuenta: ${{ totalFinal }}</p>
                </div>
                <div v-else>
                    <p class="fs-4 text-center">¡La cuenta se encuentra vacía!</p>
                </div>
            </div>
            <div v-else>
                <p class="fs-4 text-center">¡Cargando Balance! Estamos trabajando...</p>
            </div>
            <div style="display: none" id="alerta" class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" id="cruz" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <h5>{{ mensaje }}</h5>
            </div>
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
    let resultado = false

    const store = useUserStore()
    const router = useRouter()
    const TransactionsS = new TransactionsService()
    const GestionS = new GestionService()
    const mensaje = ref("")
    
    onMounted(async () => {
        await recargar()
        if (!store.isLogged) {
            router.push({name: 'LoginView'})
        } 
    })

    const recargar = async () => {
        try{
            cargando.value = true
            resultado = await TransactionsS.fetchTransactions()
            balances.value = TransactionsS.getEstadoCuenta().filter(moneda => moneda.balance > 0)
            for(const moneda of GestionS.getMonedas()){
                const Cotizacion = await GestionS.getCotizacion(moneda.codigo);
                cotizaciones.push({codigo: moneda.codigo, valor: Cotizacion.totalAsk})
            }
            if(!resultado) {
                 mensaje.value = "Error al conectar con el servidor" 
                 const alerta = document.getElementById('alerta');
                 alerta.style.display = 'block'; 
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

    const nombreMoneda = (codigo) => {
        return GestionS.getMonedas().find(moneda => moneda.codigo === codigo)
    }

</script>



<style scoped>

#alerta {
    min-width: 180px;
    position: fixed;
    top: 30%;
    left: 40%;
    right: 40%;
    width: 20%;
    height: 20%;
    display:flex;
    justify-content: center;
    background: rgb(255, 255, 255);
}

h3 {
    font-family:monospace;
    margin-top: 3rem;
    margin-bottom: 2rem;
}

table {
    font-size: 1.5rem;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

td {
    align-content: center;
}

.total {
    margin-top: 5rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

</style>






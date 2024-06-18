<template>
    <div v-if="store.isLogged">
        <h3>Historial de Movimientos</h3>
        <div v-if="!cargando">
            <table v-if="movimientos.length !== 0">
                <thead>
                    <tr>
                        <th>numero de movimiento</th>
                        <th>tipo de movimiento</th>
                        <th>Moneda</th>
                        <th>Monto moneda</th>
                        <th>total</th>
                        <th>fecha y hora</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(movimiento, index) in movimientos" :key="index">
                    <td>{{ movimiento._id }}</td>
                    <td>{{ movimiento.action }}</td>
                    <td>{{ movimiento.crypto_code }}</td>
                    <td>{{ movimiento.crypto_amount }}</td>
                    <td>{{ movimiento.money }}</td>
                    <td>{{ movimiento.datetime }}</td>
                    <td><button>mas info</button></td>
                    </tr>
                </tbody>
            </table>
            <p v-else>no se registran movimientos anteriores</p>
        </div>
        <div v-else>
            <p>cargando historial</p>
        </div>
    </div>
    <div v-else>
        <h3>para poder visualizar los movimientos usted debe iniciar sesion</h3>
        <button @click="Login()">Iniciar Sesion</button>
    </div>
    
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { useUserStore} from '@/store/User'
    import { useRouter } from 'vue-router';
    import TransactionsService from '@/Services/TransaccionesService';

    let cargando = ref(true);
    let movimientos = ref([])

    const store = useUserStore()
    const router = useRouter()
    const TransactionsS = new TransactionsService()
    
    
    onMounted(async () => {
        try{
            cargando.value = true
            await TransactionsS.fetchTransactions()
            movimientos.value = TransactionsS.getMovimientos()
        }catch(error){
            console.log(error)
        }finally{
            cargando.value = false;
        }
    })

    const Login = () => {
        router.push({name: 'LoginView'})
    }
</script>
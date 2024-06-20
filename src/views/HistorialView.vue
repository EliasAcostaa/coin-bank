<template>
    <div v-if="store.isLogged">
        <h3>Historial de Movimientos</h3>
        <div v-if="!cargando">
            <table v-if="movimientos.length !== 0">
                <thead>
                    <tr>
                        <th>numero de movimiento</th>
                        <th>tipo de movimiento</th>
                        <th>CriptoMoneda</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>fecha y hora</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(movimiento, index) in movimientos" :key="index">
                        <td>{{ movimiento._id }}</td>
                        <td>{{ movimiento.action }}</td>
                        <td>{{ movimiento.crypto_code }}</td>
                        <td>{{ movimiento.crypto_amount }}</td>
                        <td>${{ movimiento.money }}</td>
                        <td>{{ formatearFecha(movimiento.datetime) }}</td>
                        <td><button @click="abrirModal(movimiento)" >mas info</button></td>
                        <td><button @click="abrirEditar({...movimiento})">Editar</button></td>
                        <td><button @click="Eliminar(movimiento._id)">Eliminar</button></td>
                    </tr>
                    <InfoModal v-if="showModal" :visible="showModal" :movimiento="movimientoActual" @update:visible="showModal = $event" />
                    <EditModal v-if="showEdit" :visible="showEdit" :movimiento="movimientoEdit" @update:visible="showEdit = $event" @edit-move="editMove"/>
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
    import { onMounted, ref} from 'vue'
    import { useUserStore} from '@/store/User'
    import { useRouter } from 'vue-router';
    import TransactionsService from '@/Services/TransaccionesService';
    import InfoModal from '../components/InfoModalComponent.vue'
    import EditModal from '../components/EditModalComponent.vue'

    let cargando = ref(true);
    let movimientos = ref([])
    let showModal = ref(false)
    let showEdit = ref(false)

    const movimientoActual = ref({
        _id: '',
        crypto_code: '',
        crypto_amount: '',
        money: '',
        user_id: '',
        action: '',
        datetime: ''
    })

    const movimientoEdit= ref({
        _id: '',
        crypto_code: '',
        crypto_amount: '',
        money: '',
        user_id: '',
        action: '',
        datetime: ''
    })

    const store = useUserStore()
    const router = useRouter()
    const TransactionsS = new TransactionsService()
    
    onMounted(async () => {
        await recargar()
    })

    const recargar = async () => {
        try{
            cargando.value = true
            await TransactionsS.fetchTransactions()
            movimientos.value = TransactionsS.getMovimientos()
        }catch(error){
            console.log(error)
        }finally{
            cargando.value = false;
        }
    }

    const Eliminar = async (id) => {
        TransactionsS.deleteMovimiento(id)
        await recargar()
    }

    const Login = () => {
        router.push({name: 'LoginView'})
    }

    const abrirModal = (movimiento) => {
      movimientoActual.value = {...movimiento}
      movimientoActual.value.datetime = formatearFecha(movimiento.datetime)
      showModal.value = true
    }

    const abrirEditar = (movimiento) => {
        movimientoEdit.value = {...movimiento}
        showEdit.value = true
    }

    const editMove = async (movimientoE) => {
        TransactionsS.editMovimiento(movimientoE)
        await recargar()
    }

    const formatearFecha = (fechaISO) =>{
      const fecha = new Date(fechaISO);

      const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      const formato = new Intl.DateTimeFormat('es-ES', opciones);
      const fechaFormateada = formato.format(fecha);

      return fechaFormateada + "hs";
    }

    
</script>
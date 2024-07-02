<template>
    <div class="container">
    <div v-if="store.isLogged">
        <h3 class="text-center">Historial de Movimientos</h3>
        <div v-if="!cargando">
            <div class="table-responsive">
            <table class="table table-dark table-sm" v-if="movimientos.length !== 0">
                <thead>
                    <tr class="text-center">
                        <th>Número de movimiento</th>
                        <th>Tipo de movimiento</th>
                        <th>CriptoMoneda</th>           <!-- editar componentes MODAL-->
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Fecha y Hora</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center" v-for="(movimiento, index) in movimientos" :key="index">
                        <td>{{ movimiento._id }}</td>
                        <td>{{ nombreOp(movimiento.action).nombre }}</td>
                        <td>{{ nombreMoneda(movimiento.crypto_code).nombre }}</td>
                        <td>{{ movimiento.crypto_amount }}</td>
                        <td>${{ movimiento.money }}</td>
                        <td>{{ formatearFecha(movimiento.datetime) }}</td>
                        <td><button class="p-2 bg-dark border btn btn-dark d-grid gap-2 col-12 mx-auto" @click="abrirModal(movimiento)" >Info</button></td>
                        <td><button class="p-2 bg-dark border btn btn-dark d-grid gap-2 col-12 mx-auto" @click="abrirEditar({...movimiento})">Editar</button></td>
                        <td><button class="p-2 bg-dark border btn btn-dark d-grid gap-2 col-12 mx-auto" @click="Eliminar(movimiento._id)">Eliminar</button></td>
                    </tr>
                    <InfoModal v-if="showModal" :visible="showModal" :movimiento="movimientoActual" @update:visible="showModal = $event" />
                    <EditModal v-if="showEdit" :visible="showEdit" :movimiento="movimientoActual" @update:visible="showEdit = $event" @edit-move="editMove"/>
                </tbody>
            </table>
            
            <p v-else class="fs-4 text-center">No se registran movimientos anteriores.</p>
        </div>
    </div>
        <div v-else>
            <p class="fs-4 text-center">¡Cargando Historial! Estamos trabajando...</p>
        </div>
    </div>
    </div>
</template>

<script setup>
    import { onMounted, ref} from 'vue'
    import { useUserStore} from '@/store/User'
    import { useRouter } from 'vue-router';
    import TransactionsService from '@/Services/TransaccionesService';
    import GestionService from '@/Services/GestionService';
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

    const store = useUserStore()
    const router = useRouter()
    const TransactionsS = new TransactionsService()
    const GestionS = new GestionService()
    
    onMounted(async () => {
        if (!store.isLogged) {
            router.push({name: 'LoginView'})
        } 
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
        await TransactionsS.deleteMovimiento(id)
        await recargar()
    }

    const abrirModal = (movimiento) => {
      movimientoActual.value = {...movimiento}
      movimientoActual.value.datetime = formatearFecha(movimiento.datetime)
      showModal.value = true
    }

    const abrirEditar = (movimiento) => {
        movimientoActual.value = {...movimiento}
        showEdit.value = true
    }

    const editMove = async (movimientoE) => {
        await TransactionsS.editMovimiento(movimientoE)
        await recargar()
    }

    const nombreMoneda = (codigo) => {
        return GestionS.getMonedas().find(moneda => moneda.codigo === codigo)
    }

    const nombreOp = (codigo) => {
        return GestionS.getOperaciones().find(accion => accion.opcion === codigo)
    }

    const formatearFecha = (fechaISO) =>{
      const fecha = new Date(fechaISO);

      const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      const formato = new Intl.DateTimeFormat('es-ES', opciones);
      const fechaFormateada = formato.format(fecha);

      return fechaFormateada + "hs";
    }

    
</script>



<style scoped>

h3 {
    font-family:monospace;
    margin-top: 3rem;
    margin-bottom: 2rem;
}

table {
    font-size: 1.3rem;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

</style>





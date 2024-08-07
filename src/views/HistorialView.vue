<template>
    <div class="container">
    <div v-if="store.isLogged">
        <h3 class="text-center">Historial de Movimientos</h3>
        <div v-if="!cargando">
            <div class="table-responsive">
            <table class="table table-bordered-dark table-striped small" v-if="movimientos.length !== 0">
                <thead>
                    <tr class="text-center">
                        <th>Número de movimiento</th>
                        <th>Tipo de movimiento</th>
                        <th>CriptoMoneda</th>           
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
                        <td><button class="p-3 bg-dark btn btn-dark d-grid gap-1 col-12 mx-auto" @click="abrirModal(movimiento)" >Info</button></td>
                        <td><button class="p-3 bg-dark btn btn-dark d-grid gap-1 col-12 mx-auto" @click="abrirEditar({...movimiento})">Editar</button></td>
                        <td><button class="p-3 bg-dark btn btn-dark d-grid gap-1 col-12 mx-auto" @click="Eliminar(movimiento._id)">Eliminar</button></td>
                    </tr>
                    <InfoModal v-if="showModal" :visible="showModal" :movimiento="movimientoActual" @update:visible="showModal = $event" />
                    <EditModal v-if="showEdit" :visible="showEdit" :movimiento="movimientoActual" @update:visible="showEdit = $event" @edit-move="editMove"/>
                </tbody>
            </table>
            
            <p v-else class="fs-4 text-center">No se registran movimientos anteriores.</p>
            <div style="display: none" id="alerta" class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" id="cruz" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <h5>{{ mensaje }}</h5>
            </div>
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
    let resultado = false

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
    const mensaje = ref("")
    
    onMounted(async () => {
        if (!store.isLogged) {
            router.push({name: 'LoginView'})
        } 
        await recargar()
    })

    const recargar = async () => {
        try{
            cargando.value = true
            resultado = await TransactionsS.fetchTransactions()
            movimientos.value = TransactionsS.getMovimientos()
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

    const Eliminar = async (id) => {
        resultado = await TransactionsS.deleteMovimiento(id)
        if(resultado) {
            mensaje.value = "Transaccion eliminada con exito" 
        }else{
            mensaje.value = "Error al conectar con el servidor"
        }
        const alerta = document.getElementById('alerta');
        alerta.style.display = 'block';
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
        resultado = await TransactionsS.editMovimiento(movimientoE)
        if(resultado) {
            mensaje.value = "Transaccion modificada con exito" 
        }else{
            mensaje.value = "Error al conectar con el servidor"
        }
        const alerta = document.getElementById('alerta');
        alerta.style.display = 'block';
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
    font-size: 1.3rem;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

</style>





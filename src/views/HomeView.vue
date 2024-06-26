<template>
    <div class="container"> <!-- clase container para aplicar bootstrap-->
    <div v-if="store.isLogged">
        <h1>Bienvenido {{ store.userName }}</h1>
        <div class="exchange">
            <div>
                <h3>Puedes elegir el exchange que prefieras comparando precios en la moneda que quieras.</h3>
                <h3>Exchange actual {{ exchange }}</h3>
            </div>
            <div>
                <h3>
                    <select id="Moneda" v-model="eleccion.moneda">
                        <option v-for="moneda in GestionS.getMonedas()" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.nombre }}</option>
                    </select>
                </h3>
            </div>
            <div id="lista-precios" v-if="!cargando">
                <table >
                    <thead>
                        <tr>
                            <th>Exchange</th>
                            <th>Compras a</th>
                            <th>Vendes a</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(exchange, index) in precios" :key="index">
                            <td>{{ exchange.nombre }}</td>
                            <td>${{ exchange.precioCompra }}</td>
                            <td>${{ exchange.precioVenta}}</td>
                            <button @click="actExchange(exchange.codigo)">Usar</button>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>Cargando precios, estamos trabajando...</p>
            </div>
        </div>
    </div>
</div>
    
</template>

<script setup>
    import { useUserStore } from '../store/User';
    import { useRouter } from 'vue-router';
    import { ref, onMounted, watch } from 'vue';
    import GestionService from '@/Services/GestionService';

    const GestionS = new GestionService()
    const store = useUserStore();
    const router = useRouter();

    const cargando = ref(false);
    const precios = ref([])
    const exchange = ref((GestionS.getExchanges().find(exc => exc.codigo === store.exchange)).nombre)
    const eleccion = ref({
        moneda: 'btc'
    })

    const actPrecios = async () => {
        const actual = store.exchange
        precios.value.length = 0
        try{
            cargando.value = true
            for(const exchange of GestionS.getExchanges().filter(exc => exc.coins.includes(eleccion.value.moneda))){
                store.setExchange(exchange.codigo)
                const cotizacion = await GestionS.getCotizacion(eleccion.value.moneda)
                precios.value.push({nombre: exchange.nombre, codigo: exchange.codigo, precioCompra: cotizacion.totalAsk, precioVenta: cotizacion.totalBid})
            }
        }catch(error){
            console.log(error)
        }finally{
            store.setExchange(actual)
            cargando.value = false
        }
    }

    const actExchange = (codigo) => {
        store.setExchange(codigo)
        exchange.value = (GestionS.getExchanges().find(exc => exc.codigo === store.exchange)).nombre
    }

    onMounted(() =>{
        actPrecios()
    })

    onMounted(() => {
        if (!store.isLogged) {
            router.push({name: 'LoginView'})
        } 
    });

    watch(eleccion.value, actPrecios)

</script>
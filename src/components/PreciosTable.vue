<template>
    <div class="container">
    <div class="lista-precios" v-if="!cargando"> <!-- le pongo ROW a tabla de HOME para alargarla?????¿¿¿-->
        <div class="table-responsive">
        <table class="table table-bordered-dark table-striped small">
            <thead>
                <tr class="fs-4">
                    <th class="moneda">Moneda</th>
                    <th class="compra">Precio compra</th>
                    <th class="venta">Precio Venta</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="moneda in precios" :key="moneda.nombre">
                    <td>{{ moneda.nombre }}</td>
                    <td>${{ moneda.precioCompra }}</td>
                    <td>${{ moneda.precioVenta }}</td>
                </tr>
            </tbody>
        </table>
        </div>
        
    </div>
    
    <div class="cargando fs-4" v-else>
        <p class="text-center">¡Cargando Precios! Estamos trabajando...</p>  
    </div>
    </div>
</template>

<script setup>
    import GestionService from "@/Services/GestionService";
    import { useUserStore } from '@/store/User';
    import { ref, onMounted} from 'vue';

    const GestionS = new GestionService()
    const store = useUserStore();

    const precios = ref([])
    const cargando = ref(false)

    const actPrecios = async () => {
        precios.value.length = 0
        cargando.value = true
        for(const moneda of GestionS.getMonedas().filter(coin => (GestionS.getExchanges().find(ex => ex.codigo === store.exchange)).coins.includes(coin.codigo))){
            const cotizacion = await GestionS.getCotizacion(moneda.codigo)
            precios.value.push({nombre: moneda.nombre, precioCompra: cotizacion.totalAsk, precioVenta: cotizacion.totalBid})
        }
        cargando.value = false
    }

    onMounted(() =>{
        actPrecios()
    })

</script>

<style>

.cargando {
    position: relative;
}

table {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    height: 8rem;
}

.moneda,
.compra,
.venta {
    padding: 1rem;
    font-size: 1.5rem;
}

.lista-precios {
    padding: 1rem; 
}

tbody {
    font-size: 1.2rem;
    font-style: italic;
}

</style>
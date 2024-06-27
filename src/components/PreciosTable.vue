<template>
    <div class="precios" v-if="!cargando">
        <table>
            <thead>
            <tr>
                    <th>Moneda</th>
                    <th>Precio compra</th>
                    <th>Precio Venta</th>
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
    <div class="cargando" v-else>
        <p>Cargando Precios</p>
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
    position: absolute;
}

</style>
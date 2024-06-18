<template>
    <div id="navbar">
        <nav>
            <router-link :to="{name: 'HomeView'}">home</router-link>
            <router-link :to="{name: 'VenderView'}">vender</router-link>
            <router-link :to="{name: 'HistorialView'}">Historial</router-link>
            <button type="button" @click="logOut()">Cerrar Sesion</button>
        </nav>
    </div>
    
</template>

<script setup>
    import { useUserStore } from '../store/User';
    import { useRouter } from 'vue-router';

    const store = useUserStore();
    const router = useRouter();

    const logOut = () =>{
        store.desloguear()
        router.push({name: 'LoginView'})
    }
</script>
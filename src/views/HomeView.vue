<template>
    <div v-if="store.isLogged">
        <h1>logueado</h1>
        <h3>{{ store.usuario }}</h3>
        <h3>{{ store.isLogged }}</h3>
    </div>
    <div v-else>
        <h3>para poder Vender y Comprar usted debe iniciar sesion</h3>
        <button @click="Login()">Iniciar Sesion</button>
    </div>
</template>

<script setup>
    import { useUserStore} from '@/store/User'
    import { useRouter } from 'vue-router';

    const store = useUserStore()
    const router = useRouter()
    
    const Login = () => {
        router.push({name: 'LoginView'})
    }
</script>
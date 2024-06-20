<template>
    <div v-if="store.isLogged">
        <h1>Usted se ha logueado.</h1>
        <h3>{{ store.userName }}</h3>
        <h3>{{ store.isLogged }}</h3>
    </div>
    <div v-else>
        <h3>Para poder visualizar la pagina... ¡Debe iniciar sesión!</h3>
        <button @click="Login()">Iniciar Sesión</button>
    </div>
    
</template>

<script setup>
    import { useUserStore } from '../store/User';
    import { useRouter } from 'vue-router';
    import { watch } from 'vue';
    const store = useUserStore();
    const router = useRouter();

    const Login = () => {
        router.push({name: 'LoginView'})
    }

    watch(() => store.isLogged, (isLogged) => {
        if (!isLogged) {
            router.push('/login');
        } 
    });
</script>
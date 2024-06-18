<template>
    <div>
        <h1>logueado</h1>
        <h3>{{ store.usuario }}</h3>
        <h3>{{ store.isLogged }}</h3>
    </div>
    
</template>

<script setup>
    import { useUserStore } from '../store/User';
    const store = useUserStore();

    

</script>
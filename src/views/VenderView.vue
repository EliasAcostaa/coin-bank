<template>
    <div v-if="store.isLogged">
        <h1>vender</h1>
        <h3>{{ store.userName }}</h3>
        <h3>{{ store.isLogged }}</h3>
    </div>
</template>

<script setup>
    import { useUserStore } from '../store/User';
    const store = useUserStore();
</script>
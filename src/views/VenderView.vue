<template>
    <div v-if="tore.isLogged">
        <h1>vender</h1>
        <h3>{{ store.userName }}</h3>
        <h3>{{ store.isLogged }}</h3>
    </div>
</template>

<script setup>
    import { useUserStore } from '../store/User';
    import { useRouter } from 'vue-router';
    import { watch } from 'vue';
    const store = useUserStore();
    const router = useRouter();

    watch(() => store.isLogged, (isLogged) => {
        if (!isLogged) {
            router.push('/login');
        }
    });
</script>
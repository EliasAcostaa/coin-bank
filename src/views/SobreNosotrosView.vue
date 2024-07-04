<template>
    
<h1>HOLAAAA</h1> <!-- por que no anda lo que escribo????? -->

</template>


<script setup>

import { useUserStore } from '../store/User';
    import { useRouter } from 'vue-router';
    import { ref, onMounted, watch } from 'vue';
    import GestionService from '@/Services/GestionService';

    const GestionS = new GestionService()
    const store = useUserStore();
    const router = useRouter();

</script>
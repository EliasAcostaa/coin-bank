<template>
    
<h1>HOLAAAA</h1> <!-- por que no anda lo que escribo????? 
                    YA ENTENDI POR QUE NO ANDA!!!! debo escribir esto: 

                    <li class="nav-item">   
                    <router-link :to="{name: 'HomeView'}"
                    class="nav-link">Home</router-link>

                    EN LA NAVBAR DEL LOGIN!!!!!
                    
                </li>-->

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
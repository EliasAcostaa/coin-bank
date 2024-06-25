<template>
    
<nav class="navbar navbar-expand-lg navbar-light bg-light"> <!-- clase mayor que da diseño de bootstrap a barra-->
    
    <div class="container justify-content-evenly"> 
            
        <div id="navbar"> <!-- clase eli de barra -->   
            <router-link :to="{name: 'LoginView'}"></router-link>

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">       <!-- inclui dentro del <> el codigo de elias (router-link......) -->
                    <router-link :to="{name: 'HomeView'}"
                    class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">       <!-- inclui dentro del <> el codigo de elias (router-link......) -->
                    <router-link :to="{name: 'OperarView'}"
                    class="nav-link">Operar</router-link>
                </li>
                <li class="nav-item">       <!-- inclui dentro del <> el codigo de elias (router-link......) -->
                    <router-link :to="{name: 'HistorialView'}"
                    class="nav-link">Historial</router-link>
                </li>
                <li class="nav-item">       <!-- inclui dentro del <> el codigo de elias (router-link......) -->
                    <router-link :to="{name: 'EstadoActualView'}"
                    class="nav-link">Cuentas</router-link>
                </li>
                <li class="nav-link">       <!-- inclui dentro del <> el codigo de elias (router-link......) -->
                    <button type="button" @click="logOut()">Cerrar Sesión</button>
                </li>
            </ul>
        </div>
    </div>
</nav>
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
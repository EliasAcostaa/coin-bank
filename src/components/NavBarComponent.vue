<template>
    
<nav class="navbar navbar-expand-lg navbar-white" style="background-color: black"> <!-- clase mayor que da diseño de bootstrap a barra-->
    
    <div class="container justify-content-evenly"> 
            
        <div class="row" id="navbar"> <!-- clase eli de barra -->   
            <router-link :to="{name: 'LoginView'}"></router-link>

            <ul class="navbar-nav"> <!-- ".img responsive" o "img-fluid" ?? -->
                <li class="nav-item">       <!-- inclui dentro del <> el codigo de elias (router-link......) -->
                    <img class=".img-responsive" alt="logo" mx-auto src="../assets/logo/COIN BANK.gif">
                </li>
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


<style scoped>
.nav-link {
    color: white;
    font-size: 1.5rem;
    margin: 3.5rem;
}

.navbar {
    padding-top: 0.2rem;
    padding-bottom: 0.5rem;
}

img {
    width: 13rem;
}

</style>
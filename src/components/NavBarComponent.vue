<template>
    
<nav class="navbar navbar-expand-lg navbar-dark bg-black"> 
    
    <div class="container justify-content-evenly-lg"> 
            
        <router-link :to="{name: 'LoginView'}"></router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">

            <ul class="navbar-nav">
                <li class="nav-item">       <!-- router-link...... NO <a> para enlaces!!! -->
                    <img class="img-fluid" alt="logo" mx-auto src="../assets/imagenes/COIN_BANK-transparente-removebg-preview.png">
                </li>
                <li class="nav-item">   
                    <router-link :to="{name: 'HomeView'}"
                    class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">      
                    <router-link :to="{name: 'OperarView'}"
                    class="nav-link">Operar</router-link>
                </li>
                <li class="nav-item">      
                    <router-link :to="{name: 'HistorialView'}"
                    class="nav-link">Historial</router-link>
                </li>
                <li class="nav-item">      
                    <router-link :to="{name: 'EstadoActualView'}"
                    class="nav-link">Cuentas</router-link>
                </li>
                <li class="nav-link">      
                    <button class="btn btn-outline-light" type="button" @click="logOut()">Cerrar Sesión</button>
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
    font-size: 1.4rem;
    margin: 3rem;
}

img {
    width: 10rem;
}


</style>
<template>
    
<nav class="navbar navbar-expand-lg navbar-light bg-light"> <!-- clase mayor que da diseño de bootstrap a barra-->
    <div id="navbar"> <!-- clase eli de barra -->
        <nav>
            <div class="container-fluid">  <!-- COIN BANK ENLACE A PAGINA DE REGISTRO-->
                            <!-- revisar coin bank esta al pedo??¿¿¿ usarlo para otra cosa?? sino quitarlo de la pagina  -->
                <router-link :to="{name: 'LoginView'}"
                class="nav-link">Coin Bank</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                    </ul>

                <form class="d-flex">
                    <input class="form-control me-2" type="filtrar" placeholder="Búsqueda particular" aria-label="Filtrar">
                    <button class="btn btn-outline-success" type="submit">Filtrar</button>
                </form>
                
                <ul>
                    <li class="nav-item">       <!-- inclui dentro del <> el codigo de elias (router-link......) -->
                            <a class="nav-link active" aria-current="page" href="#"><button type="button" @click="logOut()">Cerrar Sesión</button></a>
                    </li>
                </ul>

            </div>
        </div>
        </nav>
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
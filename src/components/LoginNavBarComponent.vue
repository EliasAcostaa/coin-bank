<template>
    <nav data-testid="barraNavegacion" v-if="CurrentRoute == 'LoginView'" class="navbar navbar-expand-lg navbar-dark bg-black">
        <div class="container">

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-center" id="navbarNav"> 
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{name: 'ContactoView'}" @click="cambiar('ContactoView')" data-cy="LinkNavegacion"    
                        data-testid="NavLink" class="nav-link active">Contacto</router-link>
                    </li>
                    <li class="nav-item">  
                        <router-link :to="{name: 'SobreNosotrosView'}" @click="cambiar('SobreNosotrosView')" data-cy="LinkNavegacion"    
                        data-testid="NavLink2" class="nav-link active">Sobre Nosotros</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <nav v-else class="navbar">
        <div class="container"> 

            <router-link :to="{name: 'LoginView'}" class="navbar-brand" @click="cambiar('LoginView')">
            <img src="../assets/imagenes/home.png" alt="Home" width="40" height="40"> 
            </router-link>

            <router-link v-if="CurrentRoute == 'ContactoView'" :to="{name: 'SobreNosotrosView'}" class="navbar-brand" @click="cambiar('SobreNosotrosView')">
            <img src="../assets/imagenes/contact-us.png" alt="SobreNosotros" width="40" height="40">
            </router-link>
              
            <router-link v-else :to="{name: 'ContactoView'}" class="navbar-brand" @click="cambiar('ContactoView')">
            <img src="../assets/imagenes/contact-us.png" alt="Contacto" width="40" height="40">
            </router-link>
        </div>
    </nav>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { useUserStore } from '../store/User'; 
    import { ref, onMounted } from 'vue';

    const route = useRouter()
    const store = useUserStore();

    const CurrentRoute = ref('LoginView')

    onMounted(() => {
        if(route.currentRoute.value.name === undefined){
            route.push({name: 'LoginView'})
        }else{
            CurrentRoute.value = route.currentRoute.value.name
            console.log(CurrentRoute.value)
        }
    })

    const cambiar = ref((ruta) => {
        CurrentRoute.value = ruta
    })
</script>

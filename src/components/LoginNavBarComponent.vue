<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-black">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav"> <!-- centrar enlaces!!!! -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{name: 'ContactoView'}"      
                        class="nav-link active">Contacto</router-link>
                    </li>
                    <li class="nav-item">  
                        <router-link :to="{name: 'SobreNosotrosView'}"      
                        class="nav-link active">Sobre Nosotros</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'LoginView'}" class="nav-link active">
                            <img src="../assets/imagenes/home.png" alt="Home" width="40" height="40">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>

</script>

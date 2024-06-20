import { defineStore } from 'pinia'

export const useUserStore = defineStore('User',{
    state: () => ({
        isLogged: false,
        userName: null
    }),
    getters: {
        usuario(state) {
            return state.userName
        }
    },
    actions: {
        loguear(name){
            this.userName = name;
            this.isLogged = true;
        },
        desloguear(){
            this.userName = null;
            this.isLogged = false;
        }
    }
})
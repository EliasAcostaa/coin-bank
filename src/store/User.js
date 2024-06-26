import { defineStore } from 'pinia'

export const useUserStore = defineStore('User',{
    state: () => {
        return {
            isLogged: false,
            userName: '',
        }
    },
    getters: {
        usuario(state) {
            return state.userName
          }
    },
    actions: {
        loguear(name){
            this.userName = name
            this.isLogged = true;
        },
        desloguear(){
            this.userName = ''
            this.isLogged = false;
        }
    } 
})
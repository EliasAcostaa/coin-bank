import { defineStore } from 'pinia'

export const useUserStore = defineStore('User',{
    state: () => {
        return {
            isLogged: false,
            userName: '',
            exchangeAct: 'argenbtc'
        }
    },
    getters: {
        usuario(state) {
            return state.userName
        },
        exchange(state){
            return state.exchangeAct
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
        },
        setExchange(exchange){
            this.exchangeAct = exchange;
        }
    } 
})
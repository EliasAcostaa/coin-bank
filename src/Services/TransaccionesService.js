import { ref } from 'vue'
import { useUserStore} from '@/store/User'
import apiClient from './ApiTransactionsService'


class TransactionsService{
    

    constructor(){
        this.movimientos = ref([])
    }

    getMovimientos(){
        return this.movimientos.value
    }

    async deleteMovimiento(id){
        try{
           await apiClient.delete(`/transactions/${id}`)
           await this.fetchTransactions()
        }catch(error){
            console.log(error)
        }
    }

    async editMovimiento(movimientoE){
        try{
            console.log(movimientoE._id + " " + movimientoE.money)
           await apiClient.patch(`/transactions/${movimientoE._id}`, movimientoE)
           await this.fetchTransactions()
        }catch(error){
            console.log(error)
        }
    }

    async fetchTransactions(){
        try{
            const store = useUserStore()
            const response = await apiClient.get(`/transactions?q={"user_id": "${store.userName}"}`)
            this.movimientos.value = response.data
        }catch(error){
            console.log(error)
        }
    }
}

export default TransactionsService
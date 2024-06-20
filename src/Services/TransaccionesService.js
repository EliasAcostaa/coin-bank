import { ref } from 'vue'
import { useUserStore} from '@/store/User'
import apiClient from './ApiTransactionsService'
import GestionService from './GestionService'

class TransactionsService{
    

    constructor(){
        this.movimientos = ref([])
    }

    getMovimientos(){
        return this.movimientos.value
    }

    getEstadoCuenta(){
        const GestionS = new GestionService()
        const balances = []
        let total = 0
        let anterior = ''
        let actual = ''
        for (const transaction of this.movimientos.value.sort((a, b) => a.crypto_code.localeCompare(b.crypto_code))){
            const moneda = GestionS.getMonedas().find(moneda => moneda.codigo === transaction.crypto_code);
            if (moneda) {
                if(anterior === '' && actual === ''){
                    anterior = moneda.codigo
                    actual = moneda.codigo
                }
                actual = moneda.codigo
                if (anterior !== actual) {
                    balances.push({ codigo: anterior, balance: total });
                    anterior = actual
                    total = 0
                }
                if (transaction.action === 'purchase') {
                    total += transaction.crypto_amount;
                } else if (transaction.action === 'sale') {
                    total -= transaction.crypto_amount;
                }
            }
        }
        balances.push({ codigo: actual, balance: total });

        return balances
    }

    async deleteMovimiento(id){
        try{
            await apiClient.delete(`/transactions/${id}`)
        }catch(error){
            console.log(error)
        }
    }

    async editMovimiento(movimientoE){
        try{
            await apiClient.patch(`/transactions/${movimientoE._id}`, movimientoE)
        }catch(error){
            console.log(error)
        } 
    }

    async postMovimiento(movimiento){
        try{
            const response = await apiClient.post('/transactions', movimiento)
            if (response.status >= 200 && response.status < 300) {
                return true;
            } else {
                return false;
            }
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
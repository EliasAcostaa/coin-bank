import axios from "axios";
import { useUserStore } from "@/store/User";


class GestionService{
    Monedas = [{codigo: 'btc', nombre: 'Bitcoin'}, {codigo: 'eth', nombre: 'Ethereum'}, {codigo: 'usdt', nombre: 'Tether USDt'}]
    Operaciones = [{opcion: 'purchase', nombre: 'Comprar'}, {opcion: 'sale', nombre: 'Vender'}]
    Exchanges = [
        {nombre: 'ArgenBTC', codigo: 'argenbtc', coins : ['btc', 'dai', 'eth', 'usdt', 'wld']},
        {nombre: 'belo', codigo: 'belo', coins : ['btc', 'dai', 'eth', 'usdt', 'usdc']}
    ]

    constructor(){
    }

    getMonedas(){
        return this.Monedas
    }

    getExchanges(){
        return this.Exchanges
    }

    getOperaciones(){
        return this.Operaciones
    }
 
    setMonedas(codigop, monedap){
        this.Monedas.push({
            codigo: codigop,
            nombre: monedap
        })
    }

    async getCotizacion(moneda){
        const store = useUserStore();
        try{
            const response = await axios.get(`https://criptoya.com/api/${store.exchange}/${moneda}/ars`);
            return response.data
        }catch(error){
            console.log(error)
        }
    }
}

export default GestionService
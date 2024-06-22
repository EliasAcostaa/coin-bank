import axios from "axios";


class GestionService{
    Monedas = [{codigo: 'btc', nombre: 'Bitcoin'}, {codigo: 'eth', nombre: 'Ethereum'}, {codigo: 'usdt', nombre: 'Tether USDt'}]
    Operaciones = [{opcion: 'purchase', nombre: 'Comprar'}, {opcion: 'sale', nombre: 'Vender'}]
    Exchanges = [
        {nombre: 'ArgenBTC', codigo: 'argenbtc', coins : ['btc', 'dai', 'eth', 'usdt', 'wld']},
        {nombre: 'belo', codigo: 'belo', coins : ['btc', 'dai', 'eth', 'usdt', 'usdc']}
    ]
    ExchangeAct = 'argenbtc'

    constructor(){
    }

    getMonedas(){
        return this.Monedas
    }

    getExchangeAct(){
        return this.ExchangeAct
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

    setExchangeAct(exchange){
        this.ExchangeAct = exchange
    }

    async getCotizacion(moneda){
        try{
            const response = await axios.get(`https://criptoya.com/api/${this.ExchangeAct}/${moneda}/ars`);
            return response.data
        }catch(error){
            console.log(error)
        }
    }
}

export default GestionService
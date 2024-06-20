import axios from "axios";

class GestionService{
    Monedas = [{codigo: 'btc', nombre: 'Bitcoin'}, {codigo: 'eth', nombre: 'Ethereum'}, {codigo: 'usdt', nombre: 'Tether USDt'}]
    Operaciones = [{opcion: 'purchase', nombre: 'Comprar'}, {opcion: 'sale', nombre: 'Vender'}]

    constructor(){
    }

    getMonedas(){
        return this.Monedas
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
        try{
            const response = await axios.get(`https://criptoya.com/api/argenbtc/${moneda}/ars`);
            return response.data
        }catch(error){
            console.log(error)
        }
    }
}

export default GestionService
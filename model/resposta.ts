export default class RespostaModel {
    private valor: string
    private certa: boolean
    private revelada: boolean

    constructor(valor: string, certa: boolean, revelada = false) {
        this.valor = valor
        this.certa = certa
        this.revelada = revelada
    }

    static certa(valor: string) {
        return new RespostaModel(valor, true)
    }

    static errada(valor: string) {
        return new RespostaModel(valor, false)
    }

    get getValor() {
        return this.valor
    }

    get getCerta() {
        return this.certa
    }

    get getRevelada() {
        return this.revelada
    }

    revelar() {
        return new RespostaModel(this.valor, this.certa, true)
    }

    static criarUsandoObjeto(obj: RespostaModel): RespostaModel {
        return new RespostaModel(obj.valor, obj.certa)
    }

    toObject() {
        return {
            valor: this.valor, 
            certa: this.certa,
            revelada: this.revelada
        }
    }
}
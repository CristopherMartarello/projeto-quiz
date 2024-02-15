import { embaralhar } from "../functions/arrays"
import RespostaModel from "./resposta"

export default class QuestaoModel {
    private id: number
    private enunciado: string
    private respostas: RespostaModel[]
    private acertou: boolean

    constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou = false) {
        this.id = id
        this.enunciado = enunciado
        this.respostas = respostas
        this.acertou = acertou
    }

    get getId() {
        return this.id
    }

    get getEnunciado() {
        return this.enunciado
    }

    get getRespostas() {
        return this.respostas
    }

    get getAcertou() {
        return this.acertou
    }

    get naoRespondida() {
        return !this.getRespondida
    }

    get getRespondida() {
        for(let resposta of this.respostas) {
            if (resposta.getRevelada) {
                return true
            }
        }

        return false
    }

    responderCom(indice: number) : QuestaoModel {
        const acertou = this.respostas[indice]?.getCerta
        const respostas = this.respostas.map((resposta, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resposta.getCerta
            return deveRevelar ? resposta.revelar() : resposta
        })
        return new QuestaoModel(this.id, this.enunciado, respostas, acertou)
    }

    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = embaralhar(this.respostas)
        return new QuestaoModel(this.id, this.enunciado, respostasEmbaralhadas, this.acertou)
    }

    static criarUsandoObjeto(obj: QuestaoModel): QuestaoModel {
        const respostas = obj.respostas.map(resposta => RespostaModel.criarUsandoObjeto(resposta))
        return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)
    }

    toObject() {
        return {
            id: this.id,
            enunciado: this.enunciado,
            respondida: this.getRespondida,
            acertou: this.acertou,
            respostas: this.respostas.map(resp => resp.toObject()),
        }
    }
}
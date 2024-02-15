import QuestaoModel from "../model/questao";
import styles from '../styles/Questao.module.css'
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

const letras = [
    {valor: 'A', cor: '#F2C866'},
    {valor: 'B', cor: '#F266BA'},
    {valor: 'C', cor: '#85D4F2'},
    {valor: 'D', cor: '#BCE596'},
]

interface QuestaoProps {
    valor: QuestaoModel,
    tempoParaResposta?: number,
    respostaFornecida: (indice: number) => void,
    tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps) {
    const questao = props.valor

    function renderizarRespostas() {
        return questao.getRespostas.map((resposta, i) => {
            return <Resposta key={`${questao.getId}-${i}`} valor={resposta} indice={i} letra={letras[i].valor} corFundoLetra={letras[i].cor} respostaFornecida={props.respostaFornecida}/>
        })
    }

    return (
        <div className={styles.questao}>
            <Enunciado texto={questao.getEnunciado}/>
            <Temporizador key={questao.getId} duracao={props.tempoParaResposta ?? 10} tempoEsgotado={props.tempoEsgotado}/>
            {renderizarRespostas()}
        </div>
    )
}
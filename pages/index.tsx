import { useEffect, useState } from "react";
import QuestaoModel from "../model/questao";
import Questionario from '../components/Questionario'
import { useRouter } from 'next/router'

// const BASE_URL = 'http://localhost:3000/api' (apenas se eu estiver usando em localhost)
const BASE_URL = 'https://projeto-quiz-one.vercel.app/api'

export default function Home() {

  const router = useRouter()

  const [idsDasQuestoes, setIdsQuestoes] = useState<number[]>([]) //indicando que é um array de numeros
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarQuestoesIds() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    console.log(idsDasQuestoes)
    setIdsQuestoes(idsDasQuestoes)
  }

  useEffect(() => {
    carregarQuestoesIds()
  }, [])

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const dadosQuestao = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(dadosQuestao)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.getAcertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta() {
    if (questao) {
      const proximoIndice = idsDasQuestoes.indexOf(questao.getId) + 1
      return idsDasQuestoes[proximoIndice]
    }
  }

  function irProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irProximaQuestao(proximoId) : finalizar()
  }

  function irProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: '/resultado',
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? (
    <Questionario questao={questao} ultima={idProximaPergunta() === undefined} questaoRespondida={questaoRespondida} irProximoPasso={irProximoPasso} />

  ) : false
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import questoes from "../bancoDeQuestoes"

export default function handler(req, res) {
  const idSelecionado = +req.query.id // o + converte o valor de string para inteiro

  const unicaQuestaoOuNada = questoes.filter(questao => questao.getId === idSelecionado)

  if (unicaQuestaoOuNada.length === 1) {
    const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()
    const obj = questaoSelecionada.responderCom(0).toObject()
    res.status(200).json(obj)
  } else {
    res.status(204).send()
  }
}
  
import { embaralhar } from "../../../functions/arrays";
import questoes from "../bancoDeQuestoes"

export default (req, res) => {
    const ids = questoes.map(questao => questao.getId);
    res.status(200).json(embaralhar(ids))
}
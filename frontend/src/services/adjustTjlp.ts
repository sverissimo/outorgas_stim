import { Debt } from "../interfaces/Debt";
import { Tjlp } from "../interfaces/Tjlp";
import { firstCommonDateIndex } from "../utils/dateUtil";

export const adjustTjlp = (debts: Debt[], tjlp: Tjlp[]) => {
    const
        sortedDebts = debts
            .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
        , firstPg = sortedDebts[0].data
        , i = firstCommonDateIndex(firstPg, tjlp)

        , adjustedTjlp = tjlp.slice(i)
    return adjustedTjlp
}
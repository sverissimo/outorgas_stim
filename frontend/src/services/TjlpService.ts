import { Tjlp } from "../interfaces/Tjlp";
import { Debt } from "../interfaces/Debt";
import { twoDigits } from "../utils/formatNumber"
import { firstCommonDateIndex } from "../utils/dateUtil";

export class TjlpService {

    adjustTjlp = (debts: Debt[], tjlp: Tjlp[]) => {
        const
            sortedDebts = debts
                .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
            , firstPg = sortedDebts[0].data
            , i = firstCommonDateIndex(firstPg, tjlp)

            , adjustedTjlp = tjlp.slice(i)
        return adjustedTjlp
    }

    applyTjlp = (i: number, adjustedTjlp: Tjlp[], amount: number) => {
        let tjlpAmount = 0
            , tjlpRate = 0

        const isFirstPayment = i === 0
        if (!isFirstPayment) {
            tjlpRate = adjustedTjlp[i - 1].taxa
            tjlpAmount = twoDigits(amount * adjustedTjlp[i - 1].taxa)
        }
        return {
            tjlpRate,
            tjlpEfetiva: tjlpAmount
        }
    }
}

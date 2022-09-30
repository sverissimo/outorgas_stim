import { Tjlp } from "../interfaces/Tjlp"
import { twoDigits } from "../utils/formatNumber"

export const applyTjlp = (i: number, adjustedTjlp: Tjlp[], amount: number) => {
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
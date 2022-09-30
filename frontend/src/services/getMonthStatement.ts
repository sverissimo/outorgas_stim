export const a = ''
/* import { PaymentView } from "../interfaces/PaymentView"
import { stringToDateObj } from "../utils/dateUtil"
import { twoDigits } from "../utils/formatNumber"

export const getMonthStatement = (adjustedTjlp, amount, pg) => {

    let
        tjlpAmount = 0
        , tjlpRate = 0

    //No primeiro mês não há incidência de juros, incidir juros do mês anterior
    const isFirstPayment = i === 0
    if (!isFirstPayment) {
        tjlpRate = adjustedTjlp[i - 1].taxa
        tjlpAmount = twoDigits(amount * adjustedTjlp[i - 1].taxa)
    }

    amount = twoDigits(amount * (1 + tjlpRate))

    const
        monthPaidValue = twoDigits(pg?.valor || 0)
        , amountBeforePayment = amount
        , updatedDebt = twoDigits(amount -= monthPaidValue)

    const debtCell: PaymentView = {
        mes: stringToDateObj(t.mes),
        numeroGuia: pg?.numeroGuia,
        tjlp: tjlpRate,
        tjlpEfetiva: tjlpAmount,
        saldoAntesPg: amountBeforePayment,
        valorPago: monthPaidValue,
        saldoDevedor: updatedDebt
    }
    return debtCell
} */
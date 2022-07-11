import { Payment } from "../interfaces/Payment"
import { PaymentView } from "../interfaces/PaymentView"
import { Tjlp } from "../interfaces/Tjlp"
import { firstCommonDateIndex, fixTimeZone, isSameMonthAndYear } from "./dateUtil"
import { twoDigits } from "./formatNumber"

/**
 * Retorna uma array de pagamentos e saldo devedor corrigido desde a assinatura do contrato até a presente data
 * @param amount 
 * @param payments 
 * @param tjlp 
 * @param customFirstPg 
 * @returns 
 */
export const getDebt = (amount: number, payments: Payment[], tjlp: Tjlp[], customFirstPg?: any) => {

  amount = twoDigits(amount)

  let i = 0
  const
    debtSum = [] as Array<PaymentView>
    , indexToBegin: number = firstCommonDateIndex(payments[0].dataPagamento, tjlp)
    , adjustedTjlp: Tjlp[] = tjlp.slice(indexToBegin, -1)

  for (let t of adjustedTjlp) {

    const pg = payments.find(el => isSameMonthAndYear(el.dataPagamento, t.mes))

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
      mes: fixTimeZone(t.mes),
      tjlp: tjlpRate,
      tjlpEfetiva: tjlpAmount,
      saldoAntesPg: amountBeforePayment,
      valorPago: monthPaidValue,
      saldoDevedor: updatedDebt
    }
    debtSum.push(debtCell)
    i++
  }
  return debtSum
}

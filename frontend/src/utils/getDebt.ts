import { Payment } from "../interfaces/Payment"
import { Tjlp } from "../interfaces/Tjlp"
import { fixTimeZone } from "./formatDate"
import { twoDigits } from "./formatNumber"

interface DebtCell {
  mes: Date
  tjlp: number
  tjlpEfetiva: number
  valorPago: number
  saldoDevedor: number,
  saldoAntesPg: number
}

export const getDebt = (amount: number, payments: Payment[], tjlp: Tjlp[], customFirstPg?: any) => {

  const debtSum = [] as Array<DebtCell>

  let i = 0
  const
    firstPgDate = fixTimeZone(payments[0].data_pagamento)
    , firstMonth = firstPgDate.getMonth()
    , firstYear = firstPgDate.getFullYear()

  const indexToBegin = tjlp
    .findIndex(el => fixTimeZone(el.mes).getMonth() === firstMonth
      &&
      fixTimeZone(el.mes).getFullYear() === firstYear
    )

  const adjustedTjlp = tjlp.slice(indexToBegin, -1)

  for (let t of adjustedTjlp) {

    const dateTjlp = fixTimeZone(t.mes)
    dateTjlp.setDate(1)

    const
      monthTjlp = dateTjlp.getMonth()
      , yearTjlp = dateTjlp.getFullYear()
    //, firstPayment = fixTimeZone(payments[0].data_pagamento)
    //, formattedDate = dateTjlp.toLocaleDateString('pt-BR')

    /* 
        if (yearTjlp < firstPayment.getFullYear())
          continue
        if (monthTjlp < firstPayment.getMonth() && yearTjlp === firstPayment.getFullYear())
          continue */

    //FIND INSTEAD! NOT NECESSARY TO FILTER< DB ALREADY CLEAN
    const pg = payments
      .filter(
        el => fixTimeZone(el.data_pagamento).getMonth() === monthTjlp
          &&
          fixTimeZone(el.data_pagamento).getFullYear() === yearTjlp
      )

    amount = twoDigits(amount)


    //const isFirstPayment = monthTjlp === firstPayment.getMonth() && yearTjlp === firstPayment.getFullYear()
    let
      tjlpAmount = 0
      , tjlpRate = 0

    //No primeiro mês não há incidência de juros, incidir juros do mês anterior
    const isFirstPayment = i === 0
    if (!isFirstPayment)
      tjlpRate = adjustedTjlp[i - 1].taxa


    amount = twoDigits(amount * (1 + tjlpRate))
    tjlpAmount = twoDigits(amount * tjlpRate)

    //NOT NECESSARY, MONTH VALUE ALREADY SUMMED IN BD
    let monthPaidValue: number = 0
    if (pg.length) {
      const pg2: Array<number> = pg.map((el) => el.valor)
      for (let value of pg2) {
        monthPaidValue += value
      }
    }

    const
      amountBeforePayment = amount
      , updatedDebt = amount -= monthPaidValue

    const debtCell: DebtCell = {
      mes: dateTjlp,
      tjlp: tjlpRate,
      tjlpEfetiva: isFirstPayment ? twoDigits(updatedDebt * adjustedTjlp[0].taxa) : tjlpAmount,
      saldoAntesPg: amountBeforePayment,
      valorPago: monthPaidValue,
      saldoDevedor: updatedDebt
    }
    debtSum.push(debtCell)
    i++
  }
  return debtSum
}

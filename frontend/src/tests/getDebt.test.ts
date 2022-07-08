import { getDebt } from '../utils/getDebt'
import payments23_2014 from './mockData/payments_23_2014.json'
import payments21_2015 from './mockData/payments_21_2015.json'
import tjlpBndes from './mockData/tjlp_bndes.json'
import contract232014 from './mockData/contract23_2014.json'
import contract272014 from './mockData/contract21_2015.json'
import { twoDigits } from '../utils/formatNumber'

test('getDebtTest contract 23/2014', () => {

    const
        amount = twoDigits(contract232014.valor_outorga)
        , updatedPayments = getDebt(amount, payments23_2014, tjlpBndes)
        , firstPayment = updatedPayments[0]
        , secondPayment = updatedPayments[1]
        , { saldoDevedor: debt1, tjlpEfetiva: tjlp1, valorPago: pg1 } = firstPayment
        , { saldoDevedor: debt2, saldoAntesPg: before2, tjlpEfetiva: tjlp2, valorPago: pg2 } = secondPayment

    //console.log("🚀 ~ file: getDebt.test.ts ~ line 12 ~ test ~ updatedPayments", updatedPayments.slice(0, 2))

    expect(debt1).toBe(amount - pg1) //A primeira parcela não incide juros
    expect(before2).toBe(debt1 + tjlp1)
    expect(debt2).toBe(debt1 + tjlp1 - pg2)
    return
})

test('getDebtTest contract 27/2014', () => {

    const
        amount = twoDigits(contract272014.valor_outorga)
        , updatedPayments = getDebt(amount, payments21_2015, tjlpBndes)
        , firstPayment = updatedPayments[0]
        , secondPayment = updatedPayments[1]
        , { saldoDevedor: debt1, tjlpEfetiva: tjlp1, valorPago: pg1 } = firstPayment
        , { saldoDevedor: debt2, saldoAntesPg: before2, tjlpEfetiva: tjlp2, valorPago: pg2 } = secondPayment

    //console.log("🚀 ~ file: getDebt.test.ts ~ line 12 ~ test ~ updatedPayments", updatedPayments)
    console.log("🚀 ~ file: getDebt.test.ts ~ line 12 ~ test ~ updatedPayments", updatedPayments.slice(0, 2))

    console.log("🚀 ~ file: getDebt.test.ts ~ line 41 ~ test ~ before2", before2, debt1, tjlp1)
    expect(twoDigits(debt1)).toBe(amount - pg1) //A primeira parcela não incide juros
    expect(twoDigits(before2)).toBe(twoDigits(debt1 + tjlp1))
    expect(twoDigits(debt2)).toBe(twoDigits(debt1 + tjlp1 - pg2))
    return
})

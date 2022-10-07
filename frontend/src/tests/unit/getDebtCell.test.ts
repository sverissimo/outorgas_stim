import { getDebt } from '../../services/getDebt'
import payments23_2014 from '../mockData/payments_23_2014.json'
import payments21_2015 from '../mockData/payments_21_2015.json'
import tjlpBndes from '../mockData/tjlp_bndes.json'
import tjlpSef from '../mockData/tjlpSef.json'
import contract232014 from '../mockData/contract23_2014.json'
import contract212015 from '../mockData/contract21_2015.json'
import { twoDigits } from '../../utils/formatNumber'
import { PaymentView } from '../../interfaces/PaymentView'


test('getDebtTest - Contract 23/2014, TJLP: BNDES', () => {
    const
        { valor_outorga, data_assinatura } = contract232014
        , amount = twoDigits(valor_outorga)
        , updatedPayments = getDebt(amount, data_assinatura, payments23_2014, tjlpBndes)
    testPayment(amount, updatedPayments)
})

test('getDebtTest - Contract 23/2014, TJLP: SEF', () => {
    const
        { valor_outorga, data_assinatura } = contract232014
        , amount = twoDigits(valor_outorga)
        , updatedPayments = getDebt(amount, data_assinatura, payments23_2014, tjlpSef)
    testPayment(amount, updatedPayments)
})

test('getDebtTest - Contract 21/2015, TJLP: BNDES', () => {
    const
        { valor_outorga, data_assinatura } = contract212015
        , amount = twoDigits(valor_outorga)
        , updatedPayments = getDebt(amount, data_assinatura, payments21_2015, tjlpBndes)
    testPayment(amount, updatedPayments)
})


test('getDebtTest - Contract 21/2015, TJLP: SEF', () => {
    const
        { valor_outorga, data_assinatura } = contract212015
        , amount = twoDigits(valor_outorga)
        , updatedPayments = getDebt(amount, data_assinatura, payments21_2015, tjlpSef)
    testPayment(amount, updatedPayments)
})

function testPayment(amount: number, updatedPayments: PaymentView[]) {
    const
        firstPayment = updatedPayments[0]
        , secondPayment = updatedPayments[1]
        , ninthPayment = updatedPayments[8]
        , tenthPayment = updatedPayments[9]
        , { saldoDevedor: debt1, valorPago: pg1 } = firstPayment
        , { saldoDevedor: debt2, saldoAntesPg: before2, tjlpEfetiva: tjlp2, valorPago: pg2 } = secondPayment
        , { saldoDevedor: debt9 } = ninthPayment
        , { saldoDevedor: debt10, saldoAntesPg: before10, tjlpEfetiva: tjlp10, valorPago: pg10 } = tenthPayment

    //console.log("🚀 ~ file: getDebt.test.ts ~ line 12 ~ test ~ updatedPayments", [firstPayment, secondPayment, tenthPayment])

    expect(debt1).toBe(amount - pg1) //A primeira parcela não incide juros

    expect(before2).toBe(twoDigits(debt1 + tjlp2)) //check 2nd payment
    expect(debt2).toBe(twoDigits(debt1 + tjlp2 - pg2))

    expect(before10).toBe(twoDigits(debt9 + tjlp10)) //check 10th payment
    expect(debt10).toBe(debt9 + tjlp10 - pg10)
}
import humps from 'humps';
import { DebtService } from '../../services/DebtService'
import { twoDigits } from '../../utils/formatNumber'
import { Contract } from '../../interfaces/Contract';
import { PaymentView } from '../../interfaces/PaymentView'
import tjlpBndes from '../mockData/tjlp_bndes.json'
import tjlpSef from '../mockData/tjlpSef.json'
import contract232014 from '../mockData/contract23_2014.json'
import contract212015 from '../mockData/contract21_2015.json'

const { getContractDebt } = DebtService

test('getDebtTest - Contract 23/2014, TJLP: BNDES', () => {
    const
        contract = humps.camelizeKeys(contract232014) as Contract
        , amount = twoDigits(contract.valorOutorga)
        , updatedPayments = getContractDebt(contract, tjlpBndes)
    testPayment(amount, updatedPayments)
})

test('getDebtTest - Contract 23/2014, TJLP: SEF', () => {
    const
        contract = humps.camelizeKeys(contract232014) as Contract
        , amount = twoDigits(contract.valorOutorga)
        , updatedPayments = getContractDebt(contract, tjlpSef)
    testPayment(amount, updatedPayments)
})

test('getDebtTest - Contract 21/2015, TJLP: BNDES', () => {
    const
        contract = humps.camelizeKeys(contract212015) as Contract
        , amount = twoDigits(contract.valorOutorga)
        , updatedPayments = getContractDebt(contract, tjlpBndes)
    testPayment(amount, updatedPayments)
})


test('getDebtTest - Contract 21/2015, TJLP: SEF', () => {
    const
        contract = humps.camelizeKeys(contract212015) as Contract
        , amount = twoDigits(contract.valorOutorga)
        , updatedPayments = getContractDebt(contract, tjlpSef)
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

    expect(debt1).toBe(amount - pg1) //A primeira parcela não incide juros

    expect(before2).toBe(twoDigits(debt1 + tjlp2)) //check 2nd payment
    expect(debt2).toBe(twoDigits(debt1 + tjlp2 - pg2))

    expect(before10).toBe(twoDigits(debt9 + tjlp10)) //check 10th payment
    expect(debt10).toBe(twoDigits(debt9 + tjlp10 - pg10))
}
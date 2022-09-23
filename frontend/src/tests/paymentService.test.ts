import missingPayments from './mockData/missing_payments.json'
import contracts from './mockData/allContractsAndPayments.json'
import { PaymentService } from '../services/PaymentService'

const
    paymentService = new PaymentService()
    , empresaFilter = (array: any[], codigoEmpresa: number) => array.filter(pg => pg.codigoEmpresa === codigoEmpresa)

describe('Test PaymentService', () => {

    it('Test mergePayments method', () => {
        //Teste por amostragem utilizando contratos da Viação RioDoce (código 9030)
        const
            rioDoceMissing = empresaFilter(missingPayments, 9030)
            , sampleContracts = empresaFilter(contracts, 9030)
            , rioDoceFound = paymentService.getPaymentsFromContracts(sampleContracts)


        const allPayments = rioDoceFound.concat(rioDoceMissing)
        const tst = paymentService.mergePayments(allPayments)

        console.log("🚀 ~ file: paymentServiceTest.test.ts ~ line 24 ~ Text index 25...", tst[25])
        console.log("🚀 ~ file: paymentServiceTest.test.ts ~ line 25 ~ Merged payments length: ", tst.length)

        expect(tst[25].numeroGuia).toBe('000310-2015-0805, 000384-2015-0805')
    })
})

export { }
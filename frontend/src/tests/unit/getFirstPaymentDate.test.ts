import missingPayments from '../mockData/missing_payments.json'
import contracts from '../mockData/allContractsAndPayments.json'
import { PaymentService } from '../../services/PaymentService'

const empresaFilter = (array: any[], codigoEmpresa: number) => array.filter(pg => pg.codigoEmpresa === codigoEmpresa)

test('Test getFirstPaymentDate method', () => {
    //Teste por amostragem utilizando contratos da Viação RioDoce (código 9030)
    const
        rioDoceMissing = empresaFilter(missingPayments, 9030)
        , rioDoceContracts = empresaFilter(contracts, 9030)
        , rioDoceFound = PaymentService.getPaymentsFromContracts(rioDoceContracts)

    const allPayments = rioDoceFound.concat(rioDoceMissing)
    const firstPaymentDate = PaymentService.getFirstPaymentDate(allPayments)

    //console.log("🚀 ~ file: getFirstPaymentDate.test.ts ~ line 19 ~ test ~ First Payment Date:", firstPaymentDate.toLocaleDateString())

    expect(firstPaymentDate.getFullYear()).toBe(2012)
    expect(firstPaymentDate.getMonth() + 1).toBe(10)
})
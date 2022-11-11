import contracts from '../mockData/allContractsAndPayments.json'
import { PaymentService } from '../../services/PaymentService'


test('Test getPaymentsFromContracts method', () => {
    const foundPayments = PaymentService.getPaymentsFromContracts(contracts)
    console.log("🚀 ~ file: getPaymentsFromContracts.test.ts ~ line 7 ~ test ~ foundPayments", foundPayments.length)

    expect(foundPayments[0].numeroGuia).toBe('001071-2012-0805')
    expect(foundPayments[3].numeroGuia).toBe('001075-2012-0805')
    expect(foundPayments[3].valor).toBe(907.37)
})
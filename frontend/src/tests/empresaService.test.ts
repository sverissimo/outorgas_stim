import missingPayments from './mockData/missing_payments.json'
import contracts from './mockData/allContractsAndPayments.json'
import { EmpresaService } from '../services/EmpresaService'


const empresaService = new EmpresaService()

describe('Test EmpresaService', () => {

    it('Test getEmpresaPayments method', () => {

        const tst = empresaService.getPaymentsPerEmpresa(contracts, missingPayments, 9030)

        console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 14 ~ test ~ tst", tst.slice(23, 27))
        console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 15 ~ test ~ tst", tst.length)

        expect(tst[26].numeroGuia).toBe('000479-2015-0805, 000601-2015-0805')
    })

    it('Test getAllEmpresaPayments method', () => {

        const allEmpresaPayments = empresaService.getAllEmpresaPayments(contracts.slice(0, -1), missingPayments)
        console.log("🚀 ~ file: empresaService.test.ts ~ line 22 ~ it ~ allEmpresaPayments", allEmpresaPayments.length)
        //const allEmpresaPayments = empresaService.getAllEmpresaPayments(contracts.slice(-752, -600), missingPayments)
        //console.log("🚀 ~ file: empresaService.test.ts ~ line 22 ~ it ~ allEmpresaPayments", allEmpresaPayments.slice(0, 20))
    })

})

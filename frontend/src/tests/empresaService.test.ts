import missingPayments from './mockData/missing_payments.json'
import contracts from './mockData/allContractsAndPayments.json'
import { EmpresaService } from '../services/EmpresaService'
import { PaymentService } from '../services/PaymentService'
import { toCurrency } from '../utils/formatNumber'

const empresaService = new EmpresaService()

describe('Test EmpresaService', () => {

    it('Test getEmpresaPayments method', () => {

        const tst = empresaService.getPaymentsPerEmpresa(contracts, missingPayments, 9030)

        console.log("🚀 ~ file: EmpresaService.test.ts ~ line 15 ~ test ~ tst", tst.slice(23, 27))
        console.log("🚀 ~ file: EmpresaService.test.ts ~ line 16 ~ test ~ tst", tst.length)

        expect(tst[26].numeroGuia).toBe('000479-2015-0805, 000601-2015-0805')
    })

    it('Test getAllEmpresaPayments method', () => {
        const
            allEmpresaPayments = empresaService.getAllEmpresaPayments(contracts, missingPayments)
            , { count } = new PaymentService().countGuiasPerPayment(allEmpresaPayments.map(p => p.pagamentos))

        console.log("🚀 ~ file: empresaService.test.ts ~ line 27 - Guias count: ", count)
        expect(count).toBe(12339)
    })

    it('Test getEmpresaDebt', async () => {
        const
            contractsSample = empresaService.empresaFilter(contracts, 9096)
            , result = empresaService.getEmpresaDebt(contractsSample)
        //console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 14 ~ test ~ contractsSample", result)
        expect(result[0].valorOutorga).toEqual(20762273.089999996)
    })

    it('Test getAllEmpresasDebts', async () => {
        const globalDebt = empresaService.getAllEmpresasDebts(contracts)
        console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 16 ~ test ~ globalDebt", globalDebt[0])
        console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 16 ~ test ~ globalDebt", globalDebt.length)

        //globalDebt.forEach((r, i) => i < 20 ? console.log(r) : void 0)
        //return globalDebt
    })


    it('Test payments sum', async () => {
        const
            allEmpresaPayments = empresaService.getAllEmpresaPayments(contracts, missingPayments)
            , globalPaymentsValue = allEmpresaPayments
                .map(e => e.pagamentos)
                .reduce((acc, curr) => acc.concat(curr))
                .reduce((acc, curr) => acc + curr.valor, 0)

        console.log("🚀 ~ file: empresaService.test.ts ~ line 33 ~ test ~ globalPaymentsValue", globalPaymentsValue)
        //return globalDebt
    })

    it('Test debts sum', async () => {
        const
            allEmpresaDebts = empresaService.getAllEmpresasDebts(contracts)
            , globalDebtValue = allEmpresaDebts
                .reduce((acc, curr) => acc + curr.valorOutorga, 0)

        console.log("🚀 ~ file: empresaService.test.ts ~ line 44 ~ it ~ allEmpresaDebts", toCurrency(globalDebtValue))
        //return globalDebt
    })
})

import debitos from '../../../data/debitos.json'
import contracts from './mockData/allContractsAndPayments.json'

describe('Test DebtService methods', () => {

    it('Test getDebts from 2012 and before', () => {
        const empresaCodes = new Set(contracts.map(c => c.codigoEmpresa))
            , a = []
        for (const codigoEmpresa of empresaCodes) {
            const empresaDebts = debitos.filter(d => d.codigoEmpresa === codigoEmpresa)

            const tst = empresaDebts.some(d => new Date(d.data).getFullYear() === 2012 || new Date(d.data).getFullYear() === 2013)
                , tst2 = empresaDebts.some(d => new Date(d.data).getFullYear() < 2012)
            if (tst && tst2)
                a.push(codigoEmpresa)
        }
        console.log("🚀 ~ file: debtService.test.ts ~ line 12 ~ describe ~ a", a)
        console.log("🚀 ~ file: debtService.test.ts ~ line 12 ~ describe ~ a", a.length)
    })
})

export { }
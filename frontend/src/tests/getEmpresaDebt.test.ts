import missingPayments from './mockData/missing_payments.json'
import tjlpBndes from './mockData/tjlp_bndes.json'
import contracts from './mockData/allContractsAndPayments.json'
import { mergePayments } from '../services/getEmpresaDebt'


describe('getEmpresaTest - ', () => {

    it('Test mergePayments function', () => {
        const

            pgsRioDoce = missingPayments.filter(pg => pg.codigoEmpresa.toString().match('9030'))
            , pgsRioDoce2 = contracts
                .filter(c => c.codigoEmpresa === 9030)
                .map(c => c.pagamentos)

        const fk = [] as any[]
        pgsRioDoce2.forEach(pg => fk.push(...pg))
        const pgs = fk.concat(pgsRioDoce)

        //const tst = mergePayments(pgs)
        const tst = mergePayments(pgsRioDoce)

        //console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 13 ~ it ~ pgsRioDoce", pgsRioDoce.slice(0, 3))
        //console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 13 ~ it ~ pgsRioDoce2", fk)
        console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 12 ~ test ~ tst", tst)
        console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 12 ~ test ~ tst", pgs.length)
    })


})

export { }

import { Contract } from "../interfaces/Contract";
import { Payment } from "../interfaces/Payment";
import { getGlobalDebt } from "../services/getGlobalDebt";
import missingPayments from './mockData/missing_payments.json'
import tjlpBndes from './mockData/tjlp_bndes.json'
import contracts from './mockData/allContractsAndPayments.json'

test('rightPayments', () => {

    const
        missingCorps = new Set(missingPayments.map(e => e.razaoSocial))
        , rightContracts: any = contracts.filter(c => missingCorps.has(c.razaoSocial))

    const global = getGlobalDebt(tjlpBndes, rightContracts, missingPayments)
    console.log("🚀 ~ file: getGlobalDebt.test.ts ~ line 23 ~ test ~ tst", global)

})


test('getGlobalDebt', async () => {
    /*const
         rioDoce = contracts
            .filter((el: any) => parseInt(el.codigoEmpresa) === 70008)
        , rioDoce2 = missingPayments.filter((el: any) => parseInt(el.codigoEmpresa) === 70008)
        , tst = getGlobalDebt(tjlpBndes, rioDoce, rioDoce2)
 */
    //@ts-ignore
    /* const global = getGlobalDebt(tjlpBndes, contracts, missingPayments)
    console.log("🚀 ~ file: getGlobalDebt.test.ts ~ line 23 ~ test ~ tst", global) */
    void true
})

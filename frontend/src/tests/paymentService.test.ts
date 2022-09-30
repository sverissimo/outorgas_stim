import missingPayments from './mockData/missing_payments.json'
import contracts from './mockData/allContractsAndPayments.json'
import allPayments from '../../../data/allPayments.json'
import allPayments_old from '../../../data/allPayments_old.json'
import { PaymentService } from '../services/PaymentService'
import { stringToDateObj } from '../utils/dateUtil'
import { EmpresaService } from '../services/EmpresaService'

const
    paymentService = new PaymentService()
    , empresaFilter = (array: any[], codigoEmpresa: number) => array.filter(pg => pg.codigoEmpresa === codigoEmpresa)

describe('Test PaymentService', () => {

    it('Test mergePayments method', () => {
        //Teste por amostragem utilizando contratos da Viação RioDoce (código 9030)
        const
            saoCristovaoMissing = empresaFilter(missingPayments, 9370)
            , sampleContracts = empresaFilter(contracts, 9370)
            , saoCristovaoFound = paymentService.getPaymentsFromContracts(sampleContracts)


        const allPayments = saoCristovaoFound.concat(saoCristovaoMissing)
        const tst = paymentService.mergePayments(allPayments)

        console.log("🚀 ~ file: paymentServiceTest.test.ts ~ line 24 ~ Text index 25...", tst.slice(0, 15))
        console.log("🚀 ~ file: paymentServiceTest.test.ts ~ line 24 ~ Text index 25...", tst[25])
        console.log("🚀 ~ file: paymentServiceTest.test.ts ~ line 25 ~ Merged payments length: ", tst.length)

        expect(tst[25].numeroGuia).toBe('002263-2013-0805, 002249-2013-0805')
    })

    it('Test count all payments in DB', () => {

        const count = allPayments.reduce((acc, curr) => {
            const numeroGuias = curr.pagamentos
                .map(p => p.numeroGuia.split(',').length)
                .reduce((acc, curr) => acc + curr)
            return acc + numeroGuias
        }, 0)

        const count2 = allPayments_old.reduce((acc, curr) => {
            const numeroGuias = curr.pagamentos
                .map(p => p.numeroGuia.split(',').length)
                .reduce((acc, curr) => acc + curr)
            return acc + numeroGuias
        }, 0)
        const count3 = allPayments[0].pagamentos[1].numeroGuia.split(',').length
        const count4 = allPayments[0].pagamentos[2].numeroGuia.split(',').length
        console.log("🚀 ~ file: paymentService.test.ts ~ line 34 ~ it ~ count", count)
        console.log("🚀 ~ file: paymentService.test.ts ~ line 34 ~ it ~ count", count2)
        console.log("🚀 ~ file: paymentService.test.ts ~ line 34 ~ it ~ count", count3)
        console.log("🚀 ~ file: paymentService.test.ts ~ line 34 ~ it ~ count", count4)
    })

    it('Test missingPayments inside allPayments', () => {
        const
            missingOnes = []
            , allPaymentsArray = allPayments.map(p => p.pagamentos)
            , { guias } = paymentService.countGuiasPerPayment(allPaymentsArray)

        for (const p of missingPayments) {
            if (!guias.includes(p.numeroGuia))
                missingOnes.push(p.codigoEmpresa)
        }
        console.log("🚀 ~ file: paymentService.test.ts ~ line 67 ~ it ~ missingOnes", missingOnes.length)
    })

    it('Test foundPayments inside allPayments', () => {

        const
            allPaymentsArray = allPayments.map(p => p.pagamentos)
        //    , { count } = paymentService.countGuiasPerPayment(apa)


        const foundPayments = paymentService.getPaymentsFromContracts(contracts)
            , { guias, count, objCount } = paymentService.countGuiasPerPayment(allPaymentsArray)
            , { guias: guiasFP, count: fpCount } = paymentService.countGuiasPerPayment(foundPayments)

        console.log("🚀 ~ file: paymentService.test.ts ~ line 93 ~ it ~ objCount", fpCount)
        console.log("🚀 ~ file: paymentService.test.ts ~ line 88 ~ it ~  count", count)

        const fkdp = []
        for (const p of guiasFP) {
            if (!guias.includes(p))
                fkdp.push(p)
        }
        //console.log("🚀 ~ file: paymentService.test.ts ~ line 67 ~ it ~ fkdp", mp.length)
        //console.log("🚀 ~ file: paymentService.test.ts ~ line 67 ~ it ~ fkdp", fkdp)
        console.log("🚀 ~ file: paymentService.test.ts ~ line 67 ~ it ~ fkdp", fkdp.length)
        //console.log("🚀 ~ file: paymentService.test.ts ~ line 67 ~ it ~ fkdp", foundPayments.length)
    })


    it('Test getFirstPaymentDate method', () => {
        /* 
        //Teste por amostragem utilizando contratos da Viação RioDoce (código 9030)
        const
            saoCristovaoMissing = empresaFilter(missingPayments, 9370)
            , saoCristovaoContracts = empresaFilter(contracts, 9370)
            , saoCristovaoFound = paymentService.getPaymentsFromContracts(saoCristovaoContracts)

        const allPayments = saoCristovaoFound.concat(saoCristovaoMissing)
        const firstPaymentDate = paymentService.getFirstPaymentDate(allPayments)

        //console.log("🚀 ~ file: getFirstPaymentDate.test.ts ~ line 19 ~ test ~ First Payment Date:", firstPaymentDate.toLocaleDateString())

        expect(firstPaymentDate.getFullYear()).toBe(2011)
        expect(firstPaymentDate.getMonth() + 1).toBe(8)
  */
        const empresaCodes: Set<number> = new Set(missingPayments.map(p => p.codigoEmpresa))

        const contract1stDates = []
        for (const codigoEmpresa of empresaCodes) {
            const
                contracts = empresaFilter(missingPayments, codigoEmpresa)
                , date1 = paymentService.getFirstPaymentDate(contracts)
            contract1stDates.push(date1)
            // , index = missingPayments.findIndex(p => stringToDateObj(p.dataPagamento) === date1)
        }

        console.log("🚀 ~ file: paymentService.test.ts ~ line 57 - 6th element:", contract1stDates[5])
        //expect(contract1stDates[5]).toStrictEqual(new Date('2011-08-31T03:00:00.000Z'))

        //*********VERIFICA SE O MÉTODO PEGA DE FATO O PRIMEIRO PG DOS MISSING PAYMENTS */
        let i = 0
        for (const codigoEmpresa of empresaCodes) {
            const pgs = empresaFilter(missingPayments, codigoEmpresa)
                , firstPg = stringToDateObj(pgs[0].dataPagamento)

            const ok = contract1stDates[i].getTime() === firstPg.getTime()

            //console.log("🚀 ~ file: paymentService.test.ts ~ line 88 ~ it ~ contract1stDates[i]", contract1stDates[i], firstPg)
            if (!ok)
                console.log(pgs[0], contract1stDates[i])
            i++
        }
    })
})

export { }
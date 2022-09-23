import { Contract } from "../interfaces/Contract"
import { Payment } from "../interfaces/Payment"
import { PaymentService } from "./PaymentService"

export class EmpresaService {

    empresaFilter = (array: any[], codigoEmpresa: number) => {
        return array.filter(pg => pg?.codigoEmpresa == codigoEmpresa || pg?.linhaId == codigoEmpresa || pg?.linhasId == codigoEmpresa)
    }

    getEmpresasFromContracts = (contracts: Contract[]): Array<Partial<Contract>> => {

        const
            empresas = []
            , empresaCodes = new Set(contracts.map(c => c.codigoEmpresa))

        for (const e of empresaCodes) {
            const c = contracts.find(c => c.codigoEmpresa == e)!
            empresas.push({
                razaoSocial: c.razaoSocial,
                codigoEmpresa: c.codigoEmpresa
            })
        }
        return empresas
    }

    getPaymentsPerEmpresa = (contracts: Contract[], missingPayments: Payment[], codigoEmpresa: number) => {

        const filteredMissingPayments = this.empresaFilter(missingPayments, codigoEmpresa)
        const filteredContracts = this.empresaFilter(contracts, codigoEmpresa)

        const paymentService = new PaymentService()
            , contractPayments = paymentService.getPaymentsFromContracts(filteredContracts)
            , allEmpresaPayments = contractPayments.concat(filteredMissingPayments)

        if (!allEmpresaPayments.length)
            return []

        const consolidatedPayments = paymentService.mergePayments(allEmpresaPayments)
        return consolidatedPayments
    }

    getAllEmpresaPayments = (contracts: Contract[], missingPayments: Payment[]): any[] => {
        const
            empresas = this.getEmpresasFromContracts(contracts)
            , empresaCodes = empresas.map(e => e.codigoEmpresa)
            , allEmpresaPayments = []

        let i = 0
        console.log("🚀 ~ file: EmpresaService.ts ~ line 44 ~ EmpresaService ~ empresaCodes", empresaCodes)
        for (let codigoEmpresa of empresaCodes) {
            //codigoEmpresa = codigoEmpresa || 0
            if (!codigoEmpresa)
                continue

            const empresaPayments = this.getPaymentsPerEmpresa(contracts, missingPayments, codigoEmpresa)
            if (empresaPayments.length)
                allEmpresaPayments.push({
                    codigoEmpresa: codigoEmpresa,
                    pagamentos: empresaPayments
                })
            i++
            if (i % 1500 === 0)
                console.log('allEmpresaPayments: ', i, JSON.stringify(allEmpresaPayments.slice(-3)))
        }
        console.log("##### line 59 ~ EmpresaService ~ Number of payments processed: ", i)

        return allEmpresaPayments
    }



}
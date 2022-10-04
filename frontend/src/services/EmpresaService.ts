import { Contract } from "../interfaces/Contract"
import { Empresa } from "../interfaces/Empresa"
import { Payment } from "../interfaces/Payment"
import { PaymentService } from "./PaymentService"
import { isSameMonthAndYear } from "../utils/dateUtil";

export interface Debt {
    contratos: string[]
    data: string
    valorOutorga: number
}


export class EmpresaService {

    empresaFilter = (array: any[], codigoEmpresa: number) => {
        return array.filter(pg => pg?.codigoEmpresa == codigoEmpresa || pg?.linhaId == codigoEmpresa || pg?.linhasId == codigoEmpresa)
    }


    getEmpresasFromContracts = (contracts: Contract[]): Array<Partial<Empresa>> => {

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


    getEmpresaDebt = (contracts: Contract[]): Debt[] => {

        const isSameEmpresa = new Set(contracts.map(c => c.codigoEmpresa)).size === 1

        if (!isSameEmpresa)
            throw new Error('Dude, don\'t mix up different companies...')

        const debtStatement: Debt[] = []
            , debtDates = new Set(contracts
                .map(c => c?.vigencia || c.dataAssinatura))

        for (const date of debtDates) {
            const sameDateContracts = contracts.filter(c => isSameMonthAndYear(c.dataAssinatura, date))
                , totalValuePerDate = sameDateContracts
                    .reduce((acc, cur) => acc + cur.valorOutorga, 0)
            //console.log("🚀 ~ file: EmpresaService.ts ~ line 53 ~ EmpresaService ~ sameDateContracts", sameDateContracts)

            debtStatement.push({
                contratos: sameDateContracts.map(c => c.numeroContrato),
                data: date,
                valorOutorga: totalValuePerDate
            })
        }
        return debtStatement
    }

    getAllDebts = (contracts: Contract[]) => {
        const globalDebt: any[] = []
            , empresaCodes: any[] = this.getEmpresasFromContracts(contracts)
                .map(e => e.codigoEmpresa)

        for (const codigoEmpresa of empresaCodes) {
            const empresaContracts = this.empresaFilter(contracts, codigoEmpresa)
                , empresaDebt = this.getEmpresaDebt(empresaContracts)
            empresaDebt.forEach(d => globalDebt.push({
                codigoEmpresa,
                ...d
            }))
        }

        return globalDebt
    }


    getPaymentsPerEmpresa = (contracts: Contract[], missingPayments: Payment[], codigoEmpresa: number) => {

        const filteredMissingPayments = this.empresaFilter(missingPayments, codigoEmpresa)
        const filteredContracts = this.empresaFilter(contracts, codigoEmpresa)

        const paymentService = new PaymentService()
            , contractPayments = paymentService.getPaymentsFromContracts(filteredContracts)
            , allEmpresaPayments = contractPayments.concat(filteredMissingPayments)
            , sanitizedPayments = paymentService.sanitizePayments(allEmpresaPayments, codigoEmpresa)

        if (!allEmpresaPayments.length)
            return []

        const consolidatedPayments = paymentService.mergePayments(sanitizedPayments)
        return consolidatedPayments
    }


    getAllEmpresaPayments = (contracts: Contract[], missingPayments: Payment[]): any[] => {
        const
            empresas = this.getEmpresasFromContracts(contracts)
            , empresaCodes = empresas.map(e => e.codigoEmpresa)
            , allEmpresaPayments = []

        let i = 0

        for (let codigoEmpresa of empresaCodes) {
            if (!codigoEmpresa)
                continue

            const empresaPayments = this.getPaymentsPerEmpresa(contracts, missingPayments, codigoEmpresa)
            if (empresaPayments.length)
                allEmpresaPayments.push({
                    codigoEmpresa: codigoEmpresa,
                    pagamentos: empresaPayments
                })
            i++
            if (i % 1000 === 0)
                console.log('allEmpresaPayments: ', i, JSON.stringify(allEmpresaPayments.slice(-3)))
        }

        return allEmpresaPayments
    }
}

import { PaymentService } from "./PaymentService"
import { DebtService } from "./DebtService";
import { TjlpService } from "./TjlpService";
import { Contract } from "../interfaces/Contract"
import { Empresa } from "../interfaces/Empresa"
import { Payment } from "../interfaces/Payment"
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Tjlp } from "../interfaces/Tjlp";
import { PaymentView } from "../interfaces/PaymentView";
import { Debt } from "../interfaces/Debt";
import { isSameMonthAndYear, stringToDateObj } from "../utils/dateUtil";
import { ContractService } from "./ContractService";


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
                .map(contract => {
                    const
                        contractDate = stringToDateObj(contract.dataAssinatura)
                        , normalizedDate = contractDate.setDate(1)

                    return new Date(normalizedDate).toLocaleDateString()
                }))

        for (const date of debtDates) {
            const sameDateContracts = contracts.filter(c => {
                return isSameMonthAndYear(c.dataAssinatura, date)
            })
            if (!sameDateContracts.length)
                continue

            const { dataVigencia, carencia } = ContractService.getContractStartDate(sameDateContracts[0])
                , { contratos, data, valorDevido } = ContractService.aggregateContractsByDate(sameDateContracts)

            debtStatement.push({
                contratos,
                data,
                carencia,
                dataVigencia,
                valorDevido
            })
        }
        return debtStatement
    }

    getEmpresaStatements = (debts: Debt[], payments: Payment[], tjlp: Tjlp[]) => {
        const
            tjlpService = new TjlpService()
            , adjustedTjlp = tjlpService.adjustTjlp(debts, tjlp)
            , empresaStatements = []

        let saldoDevedor = DebtService.getFirstMonthDebt(debts)

        let index = 0
        let debtIndex = 0

        for (const tjlp of adjustedTjlp) {
            const
                monthPayment = payments.find(pg => isSameMonthAndYear(pg.dataPagamento, tjlp.mes))
                , valorPago = monthPayment?.valor || 0
                , newOutorga = debts.find(d => index > 0 && isSameMonthAndYear(d.data, tjlp.mes))
                , valorNovaOutorga = newOutorga?.valorDevido || 0

            let { tjlpRate, tjlpEfetiva } = tjlpService.applyTjlp(index, adjustedTjlp, saldoDevedor)

            const saldoCorrigido = saldoDevedor + tjlpEfetiva

            if (newOutorga)
                debtIndex = debts.indexOf(newOutorga)

            const reajuste = ContractService.getReajuste(tjlp.mes, debts[debtIndex].data, saldoCorrigido)

            const saldoAtualizado = saldoCorrigido + reajuste + valorNovaOutorga
            saldoDevedor = saldoAtualizado - valorPago

            const statement: PaymentView = {
                mes: stringToDateObj(tjlp.mes),
                numeroGuia: monthPayment?.numeroGuia,
                tjlp: tjlpRate,
                tjlpEfetiva,
                saldoAtualizado,
                valorPago,
                saldoDevedor,
                reajuste,
                valorNovaOutorga,
                contratos: debts[debtIndex].contratos
            }
            if (statement.mes <= new Date()) //Limita a listagem do débito à presente data (tjlp pode estar 2meses a frente)
                empresaStatements.push(statement)
            index++
        }

        return empresaStatements
    }

    getAllEmpresasDebts = (contracts: Contract[]) => {

        const globalDebt: any[] = []
            , empresaCodes: Set<number> = new Set(
                this.getEmpresasFromContracts(contracts)
                    .map(e => e.codigoEmpresa!))

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

    getAllEmpresaPayments = (contracts: Contract[], missingPayments: Payment[]): EmpresaPayments[] => {
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

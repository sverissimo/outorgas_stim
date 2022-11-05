import { Contract } from "../interfaces/Contract";
import { Debt } from "../interfaces/Debt";
import { DevedorView } from "../interfaces/DevedorView";
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Payment } from "../interfaces/Payment";
import { PaymentView } from "../interfaces/PaymentView";
import { Tjlp } from "../interfaces/Tjlp";
import { firstCommonDateIndex, isSameMonthAndYear, stringToDateObj } from "../utils/dateUtil";
import { toCurrency, twoDigits } from "../utils/formatNumber";
import { EmpresaService } from "./EmpresaService";

export interface getGlobalDebtInput {
    contratos: Contract[];
    debitos: Debt[];
    pagamentos: EmpresaPayments[];
    tjlp: Tjlp[];
}

export class DebtService {

    static getFirstMonthDebt = (debts: Debt[]) => {

        const
            sortedDebts = debts
                .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
            , firstDebts = debts
                .filter(d => isSameMonthAndYear(d.data, sortedDebts[0].data))
            , firstMonthTotalDebt = firstDebts
                .map(d => d.valorDevido)
                .reduce((prev, curr) => prev + curr)

        return firstMonthTotalDebt
    }

    static getContractDebt = (contract: Contract, tjlp: Tjlp[]) => {

        const
            { dataAssinatura } = contract
            , payments = contract.pagamentos || []

        let amount = contract.valorOutorga

        amount = twoDigits(amount)
        let i = 0
            , firstPayment = {} as Payment

        //Caso não haja pgs, cria uma instância de Payment e adiciona à array "payments".
        if (!payments?.length) {
            firstPayment = {
                dataPagamento: dataAssinatura,
                numeroGuia: '',
                valor: 0
            }
            payments.push(firstPayment)
        }

        const
            debtSum = [] as Array<PaymentView>
            , indexToBegin: number = firstCommonDateIndex(payments[0].dataPagamento, tjlp)
            , adjustedTjlp: Tjlp[] = tjlp.slice(indexToBegin)

        for (let t of adjustedTjlp) {

            const pg = payments.find(el => isSameMonthAndYear(el.dataPagamento, t.mes))

            let
                tjlpAmount = 0
                , tjlpRate = 0

            //No primeiro mês não há incidência de juros, incidir juros do mês anterior
            const isFirstPayment = i === 0
            if (!isFirstPayment) {
                tjlpRate = adjustedTjlp[i - 1].taxa
                tjlpAmount = twoDigits(amount * adjustedTjlp[i - 1].taxa)
            }

            amount = twoDigits(amount * (1 + tjlpRate))

            const
                monthPaidValue = twoDigits(pg?.valor || 0)
                , amountBeforePayment = amount
                , updatedDebt = twoDigits(amount -= monthPaidValue)

            const debtCell: PaymentView = {
                mes: stringToDateObj(t.mes),
                numeroGuia: pg?.numeroGuia,
                tjlp: tjlpRate,
                tjlpEfetiva: tjlpAmount,
                saldoAntesPg: amountBeforePayment,
                valorPago: monthPaidValue,
                saldoDevedor: updatedDebt
            }
            if (debtCell.mes <= new Date()) //Limita a listagem do débito à presente data (tjlp pode estar 2meses a frente)
                debtSum.push(debtCell)
            i++
        }
        return debtSum
    }

    static getGlobalDebt = ({ contratos, debitos, pagamentos, tjlp }: getGlobalDebtInput) => {
        const empresas = new EmpresaService()
            .getEmpresasFromContracts(contratos)
            .sort((a, b) => a.razaoSocial! > b.razaoSocial! ? 1 : -1)
            , allBalances = [] as DevedorView[]
            , allStatements = []

        for (const empresa of empresas) {
            const
                empresaDebts = debitos.filter(d => d.codigoEmpresa === empresa.codigoEmpresa)
                , empresaPayments = pagamentos.find(p => p.codigoEmpresa === empresa.codigoEmpresa)?.pagamentos!

            if (empresaDebts && empresaPayments) {
                const
                    empresaStatements = new EmpresaService().getEmpresaStatements(empresaDebts, empresaPayments, tjlp)
                    , debt = empresaStatements[empresaStatements.length - 1].saldoDevedor
                allStatements.push(empresaStatements)

                if (debt > 0)
                    allBalances.push({
                        codigoEmpresa: empresa.codigoEmpresa!,
                        empresa: empresa.razaoSocial!,
                        debt
                    })
            }
        }
        allBalances.sort((a, b) => b.debt - a.debt)
        /* console.log(
            allStatements
                .filter(s => s.some(a => a.reajuste! > 0))
                .map(a => a.find(el => el.reajuste! > 0)!)
                //.map(el => [...el.contratos!])
                //.reduce((prev, curr) => prev.concat(curr))
                .map(el => el.reajuste!)
                .reduce((prev, curr) => prev + curr)
            //.sort((a, b) => a > b ? 1 : -1)
        ) */
        const
            devedores = allBalances.filter(e => e.debt >= 0)
            , totalDebt = toCurrency(devedores.map(dev => dev.debt).reduce((acc, curr) => acc + curr))

        return { devedores, totalDebt }
    }
}

import { Contract } from "../interfaces/Contract";
import { Debt } from "../interfaces/Debt";
import { Payment } from "../interfaces/Payment";
import { PaymentView } from "../interfaces/PaymentView";
import { Tjlp } from "../interfaces/Tjlp";
import { firstCommonDateIndex, isSameMonthAndYear, stringToDateObj } from "../utils/dateUtil";
import { twoDigits } from "../utils/formatNumber";


export class DebtService {

    static getFirstMonthDebt = (debts: Debt[]) => {

        const
            sortedDebts = debts
                .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
            , firstDebts = debts
                .filter(d => isSameMonthAndYear(d.data, sortedDebts[0].data))
            , firstMonthTotalDebt = firstDebts
                .map(d => d.valorOutorga)
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
}

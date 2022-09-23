import { Contract } from "../interfaces/Contract";
import { Payment } from "../interfaces/Payment";
import { isSameMonthAndYear, addMonth, stringToDateObj } from "../utils/dateUtil";


export class PaymentService {

    getFirstPaymentDate = (payments: Payment[]) => {
        if (payments.length === 0) {
            throw new Error('************************ EMPTY ARRAY!!!!')
        }
        const firstPayment = payments
            .reduce((acc, cur) => {
                return new Date(acc.dataPagamento).getTime() > new Date(cur.dataPagamento).getTime() ? cur : acc
            })
            .dataPagamento
        const firstPaymentDate = stringToDateObj(firstPayment)
        return firstPaymentDate
    }

    getPaymentsFromContracts = (contracts: Contract[]): Payment[] => {
        const foundPayments = [] as Payment[]
            , payments = contracts.map(c => c.pagamentos)

        for (let pg of payments) {
            if (pg && pg.length)
                foundPayments.push(...pg)
        }
        return foundPayments
    }

    mergePayments = (payments: Payment[]) => {
        /*  if (!payments.length)
             throw new Error('No payments...') */
        const
            mergedPayments = [] as Payment[]
            , firstPaymentDate = this.getFirstPaymentDate(payments)
            , today = new Date().toLocaleDateString()

        let i = 0
        let pgDate = firstPaymentDate

        while (!isSameMonthAndYear(pgDate, today) && i < 2000) {

            const sameMonthPayments = payments.filter(p => isSameMonthAndYear(p.dataPagamento, pgDate))

            let guias = ''
                , valorTotal = 0

            if (sameMonthPayments.length) {
                for (const pg of sameMonthPayments) {
                    guias += pg.numeroGuia + ', '
                    valorTotal += pg.valor
                }
                mergedPayments.push({
                    numeroGuia: guias.slice(0, -2),
                    dataPagamento: pgDate.toLocaleDateString(),
                    valor: valorTotal
                })
            }

            i++
            pgDate = addMonth(pgDate)
        }
        return mergedPayments
    }
}

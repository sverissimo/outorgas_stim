import { Contract } from "../interfaces/Contract";
import { Payment } from "../interfaces/Payment";
import { isSameMonthAndYear, addMonth, stringToDateObj } from "../utils/dateUtil";


export class PaymentService {

    countGuiasPerPayment = (payments: any[]) => {
        const
            temp = []

        for (const p of payments) {
            if (Array.isArray(p))
                temp.push(...p)
            else
                temp.push(p)
        }

        const guias = temp
            .map(p => p.numeroGuia.split(', '))
            .reduce((acc, curr) => acc.concat(curr))

        /* guias.forEach(g => {
            if (g.length > 16)
                console.log("🚀 ~ file: PaymentService.ts ~ line 26 ~ PaymentService ~ g", g)
        }) */

        //console.log("🚀 ~ file: PaymentService.ts ~ line 24 ~ PaymentService ~ temp", guias.slice(0, 12))
        return { guias, count: guias.length, objCount: temp.length }

    }

    getFirstPaymentDate = (payments: Payment[]) => {
        if (payments.length === 0) {
            throw new Error('*** Cannot get firstDate of payments of an empty array!!!')
        }
        const fixedDatesPgs = payments
            .map(p => {
                if (typeof p.dataPagamento === 'string')
                    return { ...p, dataPagamento: stringToDateObj(p.dataPagamento) }
                else
                    return p
            })

        const firstPayment = fixedDatesPgs
            .sort((a, b) => new Date(a.dataPagamento).getTime() - new Date(b.dataPagamento).getTime())[0]
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

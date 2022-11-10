import { Contract } from "../interfaces/Contract";
import { Payment } from "../interfaces/Payment";
import { Tuple } from "../interfaces/Tuple";
import { isSameMonthAndYear, addMonth, stringToDateObj } from "../utils/dateUtil";


export class PaymentService {

    static countGuiasPerPayment = (payments: any[]) => {
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

    static getFirstPaymentDate = (payments: Payment[]) => {
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

    static getPaymentsFromContracts = (contracts: Contract[]): Payment[] => {
        const foundPayments = [] as Payment[]
            , payments = contracts.map(c => c.pagamentos)

        for (let pg of payments) {
            if (pg && pg.length)
                foundPayments.push(...pg)
        }
        return foundPayments
    }

    /**
     * Funde pagamentos com linhas identificadas com não identificadas na planilha do SICAR, tendo como base a empresa
     * @param payments 
     * @returns 
     */
    static mergePayments = (payments: Payment[]) => {
        const
            mergedPayments = [] as Payment[]
            , firstPaymentDate = this.getFirstPaymentDate(payments)
            , nextMonth = addMonth(new Date()).toLocaleDateString()

        let i = 0
        let pgDate = firstPaymentDate

        while (!isSameMonthAndYear(pgDate, nextMonth) && i < 2000) {

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

    static sanitizePayments = (payments: Payment[], codigoEmpresa: number) => {
        const wrongPayments: Tuple[] = [
            ['001620-2013-0805', 9096],
            ['002653-2013-0805', 9112],
            ['000119-2013-0805', 9338],
            ['000727-2016-0805', 9038],
            ['000726-2016-0805', 9364],
            ['000871-2013-0805', 9369],
        ]
        const sanitizedPayments = payments.filter(p => {
            if (!wrongPayments.some(wrong => wrong[0] === p.numeroGuia && wrong[1] === codigoEmpresa))
                return p
        })

        return sanitizedPayments
    }

    /**Empresas que assumiram contratos vigentes */
    static fixMissingPayments = (missingPayments: Payment[]) => {

        const fixedMissingPayments = missingPayments.map(p => {
            //  Pega os pagamentos da Paratur, que assumiu contratos da Braulino 
            if (p.codigoEmpresa === 70028) {
                p.codigoEmpresa = 9098

            }
            //  Pega os pagamentos da Noroeste, que assumiu contratos da Expresso Leãozinho
            if (p.codigoEmpresa === 70009) {
                p.codigoEmpresa = 9029
            }
            return p
        })
        return fixedMissingPayments
    }
}

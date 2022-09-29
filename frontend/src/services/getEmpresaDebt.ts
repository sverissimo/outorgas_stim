import { Debt } from "../interfaces/Debt"
import { EmpresaPayments } from "../interfaces/EmpresaPayments"
import { Tjlp } from "../interfaces/Tjlp"
import { firstCommonDateIndex, isSameMonthAndYear, stringToDateObj } from "../utils/dateUtil"
import { adjustTjlp } from "./adjustTjlp"

export const getEmpresaDebt = (empresaDebts: Debt[], empresaPayments: EmpresaPayments[], tjlp: Tjlp[]) => {

    const
        debts = empresaDebts.filter(e => e.codigoEmpresa === 9060)
        , payments = empresaPayments.find(e => e.codigoEmpresa === 9060)!.pagamentos
        , adjustedTjlp = adjustTjlp(debts, tjlp)

        , empresaStatement = []

    let amount = debts[0].valorOutorga

    /* const tst = stringToDateObj(adjustedTjlp[110].mes)
    console.log("🚀 ~ file: getEmpresaDebt.ts ~ line 19 ~ getEmpresaDebt ~ tst", tst)
 */
    for (const tjlp of adjustedTjlp) {
        const
            newDebtThisMonth = debts.find(d => isSameMonthAndYear(d.data, tjlp.mes))
            , monthPayment = payments.find(pg => isSameMonthAndYear(pg.dataPagamento, tjlp.mes))

        if (newDebtThisMonth)
            amount += newDebtThisMonth.valorOutorga

        if (monthPayment)
            amount -= monthPayment.valor
        console.log("🚀 ~ file: getEmpresaDebt.ts ~ line 28 ~ getEmpresaDebt ~ amount", amount, monthPayment)
    }

    return amount


}

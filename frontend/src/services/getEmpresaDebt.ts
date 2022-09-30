import { Debt } from "../interfaces/Debt"
import { EmpresaPayments } from "../interfaces/EmpresaPayments"
import { Payment } from "../interfaces/Payment"
import { PaymentView } from "../interfaces/PaymentView"
import { Tjlp } from "../interfaces/Tjlp"
import { isSameMonthAndYear, stringToDateObj } from "../utils/dateUtil"
import { adjustTjlp } from "./adjustTjlp"
import { applyTjlp } from "./applyTjlp"
import { DebtService } from "./DebtService"

export const getEmpresaDebt = (debts: Debt[], payments: Payment[], tjlp: Tjlp[]) => {

    const
        /* debts = empresaDebts.filter(e => e.codigoEmpresa === 9060)
        , payments = empresaPayments.find(e => e.codigoEmpresa === 9060)!.pagamentos */
        adjustedTjlp = adjustTjlp(debts, tjlp)
        , empresaStatements = []

    let saldoDevedor = DebtService.getFirstMonthDebt(debts)

    let index = 0
    for (const tjlp of adjustedTjlp) {
        const
            newOutorga = debts.find(d => index > 0 && isSameMonthAndYear(d.data, tjlp.mes))
            , monthPayment = payments.find(pg => isSameMonthAndYear(pg.dataPagamento, tjlp.mes))
            , newOutorgaValue = newOutorga?.valorOutorga || 0
            , valorPago = monthPayment?.valor || 0

        let { tjlpRate, tjlpEfetiva } = applyTjlp(index, adjustedTjlp, saldoDevedor)

        if (saldoDevedor < 0) // Não corrige se o saldo for negativo
            tjlpEfetiva = 0

        const saldoAntesPg = tjlpEfetiva + saldoDevedor

        saldoDevedor += newOutorgaValue //Se for o caso de contratos assinados em datas diferentes
        saldoDevedor = saldoDevedor + tjlpEfetiva - valorPago

        const statement: PaymentView = {
            mes: stringToDateObj(tjlp.mes),
            numeroGuia: monthPayment?.numeroGuia,
            tjlp: tjlpRate,
            tjlpEfetiva,
            saldoAntesPg,
            valorPago,
            saldoDevedor
        }
        if (statement.mes <= new Date()) //Limita a listagem do débito à presente data (tjlp pode estar 2meses a frente)
            empresaStatements.push(statement)
        index++
    }
    return empresaStatements
}

/*
---------------------DEPOIS DE RODAR OS STATEMENTS< ADICIONAR NOVOS CONTRATOS COM RESPECTIVA CARÊNCIA            

Ao criar o debtArray, criar regra para considerar carência de contratos
 
*/
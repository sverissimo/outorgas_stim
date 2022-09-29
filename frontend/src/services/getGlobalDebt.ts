import { Contract } from "../interfaces/Contract";
import { Payment } from "../interfaces/Payment";
import { Tjlp } from "../interfaces/Tjlp";
import { getDebt } from "../services/getDebt";

export function getGlobalDebt(tjlp: Tjlp[], contracts: Contract[], missingPayments: any[]) {

    const
        globalDebt: any[] = [0]
        , totalOutorga = []


    let count = 0
    let pg = 0
    for (const contract of contracts) {
        const
            { valorOutorga, pagamentos, dataAssinatura } = contract
            , debtSum = getDebt(valorOutorga, dataAssinatura, pagamentos, tjlp)

            //    count += debtSum[debtSum.length - 1].saldoDevedor
            , fk = debtSum.sort((a, b) => a.saldoDevedor - b.saldoDevedor).reverse()[0]
        globalDebt.push({
            contrato: contract.numeroContrato,
            empresa: contract.codigoEmpresa,
            debt: fk.saldoDevedor,
            linha: contract.linhasId,
        })
        pg += debtSum.map(a => a.valorPago).reduce((acc, b) => acc + b, 0)
        count += fk.saldoDevedor
        contract.saldoDevedor = fk.saldoDevedor

    }
    const pg2 = missingPayments.map(a => a.valor).reduce((acc, b) => acc + b, 0)
    /* console.log("🚀 ~ file: getGlobalDebt.ts ~ line 21 ~ getGlobalDebt ~ count2",
        globalDebt.sort().reverse().slice(0, 10)) */
    /*     console.log("🚀 ~ file: getGlobalDebt.ts ~ line 34 ~ getGlobalDebt ~ pg", pg + pg2)
        console.log("🚀 ~ file: getGlobalDebt.ts ~ line 55 ~ getGlobalDebt ~ count", count)
     */
    return count
}
import { Contract } from "../interfaces/Contract"
import { Tjlp } from "../interfaces/Tjlp"
import { getDebt } from "./getDebt"

export const getTotalDebt = (contracts: Contract[], tjlpBndes: Tjlp[]) => {
    let totalDebt = 0
    for (let contract of contracts) {
        const pgs = getDebt(contract.valorOutorga, contract.pagamentos, tjlpBndes)
            , lastPg = pgs[pgs.length - 1]
        totalDebt += lastPg.saldoDevedor
    }
    console.log('totalDebt: ', totalDebt)
}
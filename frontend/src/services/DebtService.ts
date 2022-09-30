import { Debt } from "../interfaces/Debt";
import { isSameMonthAndYear } from "../utils/dateUtil";

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


        /* , TotalDebt = debts
            .map(d => d.valorOutorga)
            .reduce((prev, curr) => prev + curr)
    console.log("🚀 ~ file: DebtService.ts ~ line 20 ~ DebtService ~ TotalDebt", TotalDebt) */


        return firstMonthTotalDebt
    }
}

import contracts from './mockData/allContractsAndPayments.json'
import { EmpresaService } from "../services/EmpresaService";


const { empresaFilter, getEmpresaDebt, getAllDebts } = new EmpresaService()

test('Test getEmpresaDebt', async () => {
    const
        contractsSample = empresaFilter(contracts, 9096)
        , result = getEmpresaDebt(contractsSample)
    console.log("🚀 ~ file: getGlobalDebt.test.ts ~ line 14 ~ test ~ contractsSample", result)
})

test('Test getAllEmpresasDebts', async () => {
    const globalDebt = getAllDebts(contracts)
    console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 16 ~ test ~ globalDebt", globalDebt[0])
    console.log("🚀 ~ file: getEmpresaDebt.test.ts ~ line 16 ~ test ~ globalDebt", globalDebt.length)

    //globalDebt.forEach((r, i) => i < 20 ? console.log(r) : void 0)
    //return globalDebt
})

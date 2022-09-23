import contracts from '../mockData/allContractsAndPayments.json'
import { EmpresaService } from '../../services/EmpresaService'

const { empresaFilter, getEmpresasFromContracts } = new EmpresaService()

test('Test getEmpresasFromContracts', () => {
    const
        a = empresaFilter(contracts, 9029)
        , b = getEmpresasFromContracts(contracts)
    console.log("🚀 ~ file: getEmpresasFromContracts.test.ts ~ line 9 ~ test ~ b", b)
    console.log("🚀 ~ file: getEmpresasFromContracts.test.ts ~ line 9 ~ test ~ b", b.length)
})
export { }
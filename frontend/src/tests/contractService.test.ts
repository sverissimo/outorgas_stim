import payments from '../../../data/allPayments.json'
import debitos from '../../../data/debitos.json'
import tjlp from './mockData/tjlp_bndes.json'
import { ContractService } from '../services/ContractService'
import { TjlpService } from '../services/TjlpService'
import { DebtService } from '../services/DebtService'
import { isSameMonthAndYear, stringToDateObj } from '../utils/dateUtil'
import { PaymentView } from '../interfaces/PaymentView'
import { EmpresaService } from '../services/EmpresaService'


describe('Test ContractService methods', () => {
    it('Test applyCarencias', () => {

        const debts = debitos.filter(d => d.codigoEmpresa === 9129)

        //@ts-ignore
        const statements = new EmpresaService().getEmpresaStatements(debts, payments, tjlp)


    })
})
export { }
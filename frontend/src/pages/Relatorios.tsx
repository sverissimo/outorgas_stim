import { useState, useEffect, useContext } from "react";
import { Contract } from '../interfaces/Contract'
import { Tjlp } from "../interfaces/Tjlp";
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Debt } from "../interfaces/Debt";
import { Empresa } from "../interfaces/Empresa";
import { PaymentView } from "../interfaces/PaymentView";
import { PieChart } from "../components/PieChart";
import { GlobalDataContext } from "../contexts/GlobalDataContext";
import '../styles.scss'


type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
    payments: EmpresaPayments[]
    debts: Debt[]
    selectedEmpresa: Partial<Empresa> | undefined
    empresaStatements: PaymentView[] | undefined
    topDebtors: any[]
    empresaFilter: number[]
}

export const Relatorios = () => {
    const
        [state, setState] = useState({} as State)
        , { devedores } = useContext(GlobalDataContext)

    useEffect(() => {
        const
            topDebtors = devedores.map(({ empresa, debt }) => ({ empresa, debt })).slice(0, 6)
            , lowDebtorsAmount = devedores.slice(6).reduce((acc, curr) => acc + curr.debt, 0)
            , lowDebtorsCount = devedores.length - topDebtors.length

        topDebtors.push({ empresa: `OUTROS (${lowDebtorsCount})`, debt: lowDebtorsAmount })

        setState({ ...state, topDebtors })
    }, [])

    if (state.topDebtors)
        return (
            <div className="container" style={{ justifyContent: 'center' }}>
                <h2>Resumo do saldo devedor - Outorgas do Transporte Intermunicipal</h2>
                <PieChart devedores={state.topDebtors} />
            </div>
        )
    else return null
}

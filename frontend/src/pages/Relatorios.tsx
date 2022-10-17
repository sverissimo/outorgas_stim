import { useState, useEffect, useTransition, useContext } from "react";
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom";
import { Api } from "../api/Api"
import { EmpresaService } from "../services/EmpresaService";

import { Contract } from '../interfaces/Contract'
import { Tjlp } from "../interfaces/Tjlp";
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Debt } from "../interfaces/Debt";
import { Empresa } from "../interfaces/Empresa";
import { PaymentView } from "../interfaces/PaymentView";
import { toCurrency } from "../utils/formatNumber";
import { Loading } from "../components/Loading";
import { PieChart } from "../components/PieChart";
import '../styles.scss'
import { EmpresaContext } from "../context/EmpresaContext";

type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
    payments: EmpresaPayments[]
    debts: Debt[]
    selectedEmpresa: Partial<Empresa> | undefined
    empresaStatements: PaymentView[] | undefined
    globalBalance: any
    empresaFilter: number[]
}

export const Relatorios = () => {

    const
        api = new Api()
        , [state, setState] = useState({} as State)
        , [isPending, startTransition] = useTransition()
        , { setEmpresaFilter } = useContext(EmpresaContext)


    const queryMultiple = () => {
        const contracts = useQuery('contracts', () => api.get('/api/get_contracts_and_payments'))
            , tjlpBndes = useQuery('tjlpBndes', () => api.get('/api/tjlp/bndes'))
            , payments = useQuery('payments', () => api.get('/api/pagamentos'))
            , debts = useQuery('debts', () => api.get('/api/debitos'))
        return [contracts, tjlpBndes, payments, debts]
    }

    const [
        { isLoading: loadingContracts, isSuccess: contractsOk, data: contracts, error },
        { isLoading: loadingTjlp, isSuccess: tjlpOk, data: tjlpBndes },
        { isLoading: loadingPayments, isSuccess: paymentsOk, data: payments },
        { isLoading: loadingDebts, isSuccess: debtsOk, data: debts },
    ] = queryMultiple()

    useEffect(() => {
        if (contractsOk && paymentsOk && tjlpOk && debtsOk)
            setState({ ...state, contracts, tjlpBndes, payments, debts })
    }, [contractsOk, paymentsOk, tjlpOk, debtsOk])

    useEffect(() => {
        const { contracts, tjlpBndes, payments, debts } = state

        if (contracts && tjlpBndes && payments && debts)
            startTransition(() => getGlobalReport())
    }, [state.contracts, state.tjlpBndes, state.payments, state.debts])

    useEffect(() => {
        if (state?.globalBalance?.empresaFilter) {
            setEmpresaFilter(state.globalBalance.empresaFilter)
        }
    }, [state?.globalBalance?.empresaFilter])

    if (loadingContracts || loadingTjlp || loadingPayments || loadingDebts)
        return <><Loading /></>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>


    const getGlobalReport = () => {
        const empresas = new EmpresaService()
            .getEmpresasFromContracts(contracts)
            .sort((a, b) => a.razaoSocial! > b.razaoSocial! ? 1 : -1)
            , allBalances = []

        for (const empresa of empresas) {
            const
                empresaDebts = state.debts.filter(d => d.codigoEmpresa === empresa.codigoEmpresa)
                , empresaPayments = state.payments.find(p => p.codigoEmpresa === empresa.codigoEmpresa)?.pagamentos!

            if (empresaDebts && empresaPayments) {
                const
                    empresaStatements = new EmpresaService().getEmpresaStatements(empresaDebts, empresaPayments, tjlpBndes)
                    , debt = empresaStatements[empresaStatements.length - 1].saldoDevedor

                if (debt > 0)
                    allBalances.push({
                        codigoEmpresa: empresa.codigoEmpresa,
                        empresa: empresa.razaoSocial,
                        debt
                    })
            }
        }

        allBalances.sort((a, b) => b.debt - a.debt)
        const saldoGlobal = toCurrency(allBalances.map(el => el.debt).reduce((acc, curr) => acc + curr))
            , devedores = allBalances.filter(e => e.debt >= 0)
            , totalDebt = toCurrency(devedores.map(dev => dev.debt).reduce((acc, curr) => acc + curr))
            , topDebtors = devedores.map(({ empresa, debt }) => ({ empresa, debt })).slice(0, 6)
            , lowDebtorsAmount = devedores.slice(6).reduce((acc, curr) => acc + curr.debt, 0)
            , lowDebtorsCount = devedores.length - topDebtors.length

        topDebtors.push({ empresa: `OUTROS (${lowDebtorsCount})`, debt: lowDebtorsAmount })
        const empresaFilter = devedores.map(d => d.codigoEmpresa!)

        setState({
            ...state, globalBalance: { saldoGlobal, devedores, totalDebt, topDebtors, empresaFilter }
        })

    }

    if (state.globalBalance)
        return (
            <div className="container" style={{ justifyContent: 'center' }}>
                {
                    isPending && <><Loading /></>
                }
                <h2>Resumo do saldo devedor - Outorgas do Transporte Intermunicipal</h2>
                <ul>
                    <li>Débito Global: {state.globalBalance.totalDebt}</li>
                    <li>Total de empresas devedoras: {state.globalBalance.devedores.length}</li>
                </ul>
                <PieChart devedores={state.globalBalance.topDebtors} />
            </div>
        )
    else return null
}

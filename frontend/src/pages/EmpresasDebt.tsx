import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom";
import MUIDataTable, { FilterType, MUIDataTableOptions } from 'mui-datatables';
import { Container, ThemeProvider } from "@mui/material";
import { Api } from "../api/Api"
import { columns } from '../config/tableColumns'
import { getMuiTheme } from "../config/tableStyles";
import { textLabels } from "../config/tableLabels";
import { Contract } from '../interfaces/Contract'
import { Tjlp } from "../interfaces/Tjlp";
import { jsonToXlsx } from "../utils/exportToXls";
import { tableDataToJson } from "../utils/tableDataToJson";
import { getGlobalDebt } from "../services/getGlobalDebt";
import '../styles.scss'
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Debt } from "../interfaces/Debt";
import { getEmpresaDebt } from "../services/getEmpresaDebt";

type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
    payments: EmpresaPayments[]
    debts: Debt[]
}


export const EmpresasDebt = () => {

    const
        api = new Api()
        , [state, setState] = useState({} as State)

    const queryMultiple = () => {
        //const contracts = useQuery('contracts', () => api.get('/api/get_contracts'))
        const contracts = useQuery('contracts', () => api.get('/api/get_contracts'))
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

    let navigate = useNavigate()

    useEffect(() => {
        if (contractsOk && paymentsOk && tjlpOk && debtsOk)
            setState({ ...state, contracts, tjlpBndes, payments, debts })
    }, [contractsOk, paymentsOk, tjlpOk, debtsOk])
    //console.log("🚀 ~ file: EmpresasDebt.tsx ~ line 52 ~ EmpresasDebt ~ debts", state)


    if (loadingContracts || loadingTjlp || loadingPayments || loadingDebts)
        return <h1> "Carregando..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>



    const a = getEmpresaDebt(debts, payments, tjlpBndes)
    console.log("🚀 ~ file: EmpresasDebt.tsx ~ line 67 ~ EmpresasDebt ~ a", a)

    /* const a = useMemo(() =>
        getEmpresaDebt(debts, payments, tjlpBndes)
        , [])
    console.log("🚀 ~ file: EmpresasDebt.tsx ~ line 67 ~ EmpresasDebt ~ a", a)
 */

    return (
        <div>EmpresasDebt</div>
    )
}


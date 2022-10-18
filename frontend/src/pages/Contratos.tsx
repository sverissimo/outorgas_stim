import { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query"
import MUIDataTable, { FilterType, MUIDataTableOptions } from 'mui-datatables';
import { Container, ThemeProvider } from "@mui/material";
import { Api } from "../api/Api"
import { EmpresaContext } from "../context/EmpresaContext";
import { columns } from '../config/tableColumns'
import { getMuiTheme } from "../config/tableStyles";
import { textLabels } from "../config/tableLabels";

import { Contract } from '../interfaces/Contract'
import { Tjlp } from "../interfaces/Tjlp";
import { jsonToXlsx } from "../utils/exportToXls";
import { tableDataToJson } from "../utils/tableDataToJson";
import '../styles.scss'
import { Loading } from "../components/Loading";
import { Empresa } from "../interfaces/Empresa";

type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
    missingPayments: any[]
    empresas: Partial<Empresa>[]
}


export const Contratos = () => {

    const
        api = new Api()
        , [state, setState] = useState({} as State)
        , { empresaFilter } = useContext(EmpresaContext)

    const queryMultiple = () => {
        const contracts = useQuery('contracts', () => api.get('/api/get_contracts_and_payments'))
            , tjlpBndes = useQuery('tjlpBndes', () => api.get('/api/tjlp/bndes'))
            , missingPayments = useQuery('missingPayments', () => api.get('/api/missing_payments'))
        return [contracts, tjlpBndes, missingPayments]
    }

    const [
        { isLoading: loadingContracts, data: contracts, error },
        { isLoading: loadingTjlp, data: tjlpBndes },
        { isLoading: loadingMissingPayments, data: missingPayments },
    ] = queryMultiple()

    useEffect(() => {
        if (!loadingContracts && empresaFilter) {
            const filteredContracts = contracts.filter((c: any) => empresaFilter.includes(c.codigoEmpresa))
            setState({ ...state, contracts, tjlpBndes, missingPayments })
        }

    }, [contracts, tjlpBndes, missingPayments])


    if (loadingContracts || loadingTjlp || loadingMissingPayments)
        return <><Loading /></>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>


    const options: MUIDataTableOptions = {
        filterType: 'dropdown' as FilterType,
        selectableRowsHideCheckboxes: true,
        print: false,
        textLabels: textLabels,
        responsive: 'simple',
        rowsPerPage: 25,
        rowsPerPageOptions: [10, 25, 50],
        onDownload: (buildHead, buildBody, columns, data) => {
            const
                formattedData = tableDataToJson(columns, data)
                , today = new Date().toLocaleDateString()
            jsonToXlsx(`Outorgas em ${today}`, formattedData)
            return false
        }
    }
    return (
        <Container maxWidth={"xl"}>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Contratos de Outorga"}
                    data={state.contracts}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </Container>
    )
}

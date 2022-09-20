import { useQuery } from "react-query"
import { Api } from "../api/Api"
import MUIDataTable, { FilterType, MUIDataTableOptions } from 'mui-datatables';
import { columns } from '../config/tableColumns'
import { Container, ThemeProvider } from "@mui/material";
import { getMuiTheme } from "../config/tableStyles";
import '../styles.scss'
import { textLabels } from "../config/tableLabels";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Contract } from '../interfaces/Contract'
import { Tjlp } from "../interfaces/Tjlp";
import { jsonToXlsx } from "../utils/exportToXls";
import { tableDataToJson } from "../utils/tableDataToJson";

type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
}


export const OutorgaTable = () => {

    const
        api = new Api()
        , [state, setState] = useState({} as State)

    const queryMultiple = () => {
        //const contracts = useQuery('contracts', () => api.get('/api/get_contracts'))
        const contracts = useQuery('contracts', () => api.get('/api/get_contracts_and_payments'))
            , tjlpBndes = useQuery('tjlpBndes', () => api.get('/api/tjlp/bndes'))
        return [contracts, tjlpBndes]
    }
    const [
        { isLoading: loadingContracts, data: contracts, error },
        { isLoading: loadingTjlp, data: tjlpBndes },
    ] = queryMultiple()

    let navigate = useNavigate()

    useEffect(() => {
        setState({ ...state, contracts, tjlpBndes })
    }, [contracts, tjlpBndes])

    if (loadingContracts || loadingTjlp)
        return <h1> "Carregando..."</h1>

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
        onRowClick: (rowData, rowMeta): void => {
            const nContrato = rowData[3].replace('/', '-')
            navigate(`/contrato/${nContrato}`, {
                state: {
                    parcelasPagas: contracts[rowMeta.dataIndex].parcelasPagas,
                    tjlpBndes
                }
            })
        },
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

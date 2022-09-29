import { useState, useEffect } from "react";
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

type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
    missingPayments: any[]
}


export const OutorgaTable = () => {

    const
        api = new Api()
        , [state, setState] = useState({} as State)

    const queryMultiple = () => {
        //const contracts = useQuery('contracts', () => api.get('/api/get_contracts'))
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

    let navigate = useNavigate()

    useEffect(() => {
        setState({ ...state, contracts, tjlpBndes, missingPayments })
    }, [contracts, tjlpBndes, missingPayments])



    if (loadingContracts || loadingTjlp || loadingMissingPayments)
        return <h1> "Carregando..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>

    //const tst = useMemo(() => getGlobalDebt(tjlpBndes, contracts), [contracts])

    const
        rioDoce = contracts.filter((el: any) => el.codigoEmpresa === 70008)
        , rioDoce2 = missingPayments.filter((el: any) => el.codigoEmpresa === 70008)

    //, tst = getGlobalDebt(tjlpBndes, rioDoce, rioDoce2)
    //, tst = getGlobalDebt(tjlpBndes, contracts, missingPayments)
    //console.log("🚀 ~ file: OutorgaTable.tsx ~ line 49 ~ OutorgaTable ~ tst", tst)


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

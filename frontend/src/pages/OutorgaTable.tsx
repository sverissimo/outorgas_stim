import { useQuery } from "react-query"
import { Api } from "../api/Api"
import MUIDataTable, { FilterType, MUIDataTableOptions } from 'mui-datatables';
import { columns } from '../config/tableColumns'
import { Container, ThemeProvider } from "@mui/material";
import { getMuiTheme } from "../config/tableStyles";
import '../styles.scss'
import { textLabels } from "../config/tableLables";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Contract } from '../interfaces/Contract'


type IState = {
    contracts: Contract[]
}

export const OutorgaTable = () => {

    const
        api = new Api()
        , [state, setState] = useState({} as IState)
        , { isLoading, data, error } = useQuery('tst', () => api.get('/api/get_contracts'), { retry: false })

    let navigate = useNavigate()

    useEffect(() => {
        setState({ ...state, contracts: data })
    }, [data])

    if (isLoading)
        return <h1> "Loading..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>



    const options: MUIDataTableOptions = {
        filterType: 'dropdown' as FilterType,
        selectableRowsHideCheckboxes: true,
        textLabels: textLabels,
        responsive: 'simple',
        onRowClick: (rowData, rowMeta): void => {
            const nContrato = rowData[3].replace('/', '-')
            navigate(`/contrato/${nContrato}`, { state: { ...data[rowMeta.dataIndex] } })
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

{/* <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
        /> */}
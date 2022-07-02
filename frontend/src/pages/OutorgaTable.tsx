import { useQuery } from "react-query"
import { Api } from "../api/Api"
import MUIDataTable, { FilterType, MUIDataTableOptions } from 'mui-datatables';
import { columns } from '../config/tableColumns'
import { Container, ThemeProvider } from "@mui/material";
import { getMuiTheme } from "../config/tableStyles";
import '../styles.scss'
import { textLabels } from "../config/tableLables";
import { useNavigate } from "react-router-dom";

export interface IContract {
    cnpj: String,
    codigo_empresa: String,
    data_assinatura: String,
    edital: String,
    linhas_id?: String,
    n_parcelas: String,
    numero_contrato: String,
    pagamentos?: any
}

export const OutorgaTable = () => {

    const
        api = new Api()
        , { isLoading, data, error } = useQuery('tst', () => api.get('/api/get_contracts'), { cacheTime: 0, retry: false })
        , data1: Array<IContract> = data && JSON.parse(data)
    let navigate = useNavigate()

    if (isLoading)
        return <h1> "Loading..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>

    const data2 = data1.map(el => {
        const { pagamentos, ...contractInfo } = el
        return contractInfo
    })

    const options: MUIDataTableOptions = {
        filterType: 'dropdown' as FilterType,
        selectableRowsHideCheckboxes: true,
        textLabels: textLabels,
        responsive: 'simple',
        onRowClick: (rowData, rowMeta): void => {
            console.log(rowData, rowMeta)
            const nContrato = rowData[3].replace('/', '-')
            navigate(`/contrato/${nContrato}`, { state: data1[rowMeta.dataIndex] })
        }
    }

    return (

        <Container maxWidth={"xl"}>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Contratos de Outorga"}
                    data={data2}
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
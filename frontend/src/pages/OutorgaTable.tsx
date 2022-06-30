import { useQuery } from "react-query"
import { Api } from "../api/Api"
import MUIDataTable, { FilterType, MUIDataTableOptions } from 'mui-datatables';
import { columns } from '../config/tableColumns'
import { Container, ThemeProvider } from "@mui/material";
import { getMuiTheme } from "../config/tableStyles";
import '../styles.scss'
import { textLabels } from "../config/tableLables";

interface IContract {
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

    const api = new Api()

    const { isLoading, data, error } = useQuery('tst', () => api.get('/api/get_contracts'), { cacheTime: 0, retry: false })
        , data1: Array<IContract> = data && JSON.parse(data)

    //const columns = ['razao_social', 'cnpj', 'codigo_empresa', 'data_assinatura', 'edital', 'n_parcelas', 'numero_contrato', 'valor_outorga']


    if (isLoading)
        return <h1> "Loading..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>

    const data2 = data1.map(el => {
        //delete el.linhas_id
        delete el.pagamentos
        return el
    })
    const options: MUIDataTableOptions = {
        filterType: 'dropdown' as FilterType,
        selectableRowsHideCheckboxes: true,
        textLabels: textLabels,
        responsive: 'simple'
    }

    return (

        <Container maxWidth={false}>
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
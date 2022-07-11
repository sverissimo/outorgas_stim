import { MUIDataTableColumnOptions } from "mui-datatables"
import { formatDate } from "../utils/dateUtil"

interface Column {
    name: string,
    label: string,
    options: MUIDataTableColumnOptions,
    type?: string
}

//['razao_social', 'cnpj', 'codigo_empresa', 'data_assinatura', 'edital', 'n_parcelas', 'numero_contrato', 'valor_outorga']

export const columns: Column[] = [
    {
        name: "razaoSocial",
        label: "Razão Social",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return value.toUpperCase()
            },
        },

    },
    {
        name: "cnpj",
        label: "CNPJ",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "codigoEmpresa",
        label: "Código da Empresa",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "numeroContrato",
        label: "Número do Contrato",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "dataAssinatura",
        label: "Data de Assinatura",
        type: 'date',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                //return value
                return formatDate(value)
            },
        }
    }, {
        name: "edital",
        label: "Edital",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "linhasId",
        label: "Linhas",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return value.join()
            }
        }
    },
    {
        name: "nParcelas",
        label: "Número de Parcelas",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "parcelasPagas",
        label: "Pagamentos efetuados",
        options: {
            filter: false
        }
    },
    {
        name: "valorOutorga",
        label: "Valor da Outorga",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return Number(value).toFixed(2)
            }
        }
    }
]
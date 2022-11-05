import { MUIDataTableColumnOptions } from "mui-datatables"
import { stringToDateObj } from "../utils/dateUtil"
import { toCurrency } from "../utils/formatNumber"

interface Column {
    name: string,
    label: string,
    options: MUIDataTableColumnOptions,
    type?: string
}

//['razao_social', 'cnpj', 'codigo_empresa', 'data_assinatura', 'edital', 'n_parcelas', 'numero_contrato', 'valor_outorga']

export const contratoTableColumns: Column[] = [
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
        name: "codigoEmpresa",
        label: "Código da Empresa",
        options: {
            filter: false,
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
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return new Date(value).toLocaleDateString('pt-BR')
            },
            sortCompare: (order => (obj1, obj2) => {
                const
                    date1 = stringToDateObj(obj1.data)
                    , date2 = stringToDateObj(obj2.data)
                return (date1.getTime() - date2.getTime()) * (order === 'asc' ? 1 : -1)
            })
        }
    },
    {
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
        name: "valorOutorga",
        label: "Valor da Outorga",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return toCurrency(Number(value))
            }
        }
    },
    {
        name: "convalidacao",
        label: "Valor da Convalidação",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value = 0, tableMeta, updateValue) => {
                return toCurrency(Number(value))
            }
        }
    },
    {
        name: "valorDevido",
        label: "Valor Devido",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value = 0, tableMeta, updateValue) => {
                return toCurrency(Number(value))
            }
        }
    }
]
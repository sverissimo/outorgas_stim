import { MUIDataTableColumn } from "mui-datatables"
import { toCurrency, toPercentage } from "../utils/formatNumber"


export const debtColumns: MUIDataTableColumn[] = [
    {
        name: "mes",
        label: "Mês/ano",
        options: {
            filter: false,
            sort: true,
            sortCompare: (order) => (a: { data: any }, b: { data: any }) => {
                const
                    aMonth = +a.data.slice(0, 2)
                    , aYear = +a.data.slice(-4)
                    , bMonth = +b.data.slice(0, 2)
                    , bYear = +b.data.slice(-4)
                    , date1 = new Date(aYear, aMonth)
                    , date2 = new Date(bYear, bMonth)

                return (date1.getTime() - date2.getTime()) * (order === 'asc' ? 1 : -1)
            },
        }
    },
    {
        name: "numeroGuia",
        label: "Número da guia",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "tjlp",
        label: "TJLP aplicada",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                const formatted = toPercentage(value)
                return formatted === '0%' ? '-' : formatted
            },
        }
    },
    {
        name: "tjlpEfetiva",
        label: "Valor TJLP",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                const formatted = toCurrency(value)
                return formatted === 'R$0' ? '-' : formatted

            },
        }
    },
    {
        name: "saldoAntesPg",
        label: "Saldo corrigido",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                const formatted = toCurrency(value)
                return formatted === 'R$0' ? '-' : formatted
            },
        }
    },
    {
        name: "valorPago",
        label: "Valor Pago",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                const formatted = toCurrency(value)
                return formatted === 'R$0' ? '-' : formatted
            },
        }
    }, {
        name: "saldoDevedor",
        label: "Saldo Devedor",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const formatted = toCurrency(value)
                return formatted === 'R$0' ? '-' : formatted
            },
        }
    },

]
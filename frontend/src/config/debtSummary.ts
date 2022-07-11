import { MUIDataTableColumn } from "mui-datatables"
import { formatDate } from "../utils/dateUtil"
import { toCurrency, toPercentage } from "../utils/formatNumber"


export const debtColumns: MUIDataTableColumn[] = [
    {
        name: "mes",
        label: "Mês/ano",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "tjlp",
        label: "TJLP aplicada (mês anterior)",
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
        label: "Saldo anterior ao pagamento",
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
            sort: true,
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
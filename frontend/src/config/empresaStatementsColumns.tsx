import { MUIDataTableColumn } from "mui-datatables"
import { ReadjustmentCell } from "../components/ReadjustmentCell"
import { PaymentView } from "../interfaces/PaymentView"
import { dateToFormattedString } from "../utils/dateUtil"
import { toCurrency, toPercentage } from "../utils/formatNumber"
//import{} from ''

export const empresaStatementsColumns: MUIDataTableColumn[] = [
    {
        name: "mes",
        label: "Mês/ano",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const formatted = dateToFormattedString(value)
                return formatted
            }
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
        name: "valorNovaOutorga",
        label: "Novos contratos / reajustes",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                const { rowIndex, tableData }: { rowIndex: number, tableData: object[] } = tableMeta
                    , data = tableData[rowIndex] as PaymentView

                return <ReadjustmentCell data={data} />
            },
        }
    },
    {
        name: "saldoAtualizado",
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

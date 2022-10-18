import { MUIDataTableColumnOptions } from "mui-datatables"
import { toCurrency } from "../utils/formatNumber"

interface Column {
    name: string,
    label: string,
    options: MUIDataTableColumnOptions,
    type?: string
}

//['razao_social', 'cnpj', 'codigo_empresa', 'data_assinatura', 'edital', 'n_parcelas', 'numero_contrato', 'valor_outorga']

export const debtorListColumns: Column[] = [
    {
        name: "id",
        label: "Nº",
        options: {
            filter: false,
            sort: true,
            customBodyRenderLite: (dataIndex, rowIndex) => {
                return rowIndex + 1

            }
        },
    },
    {
        name: "empresa",
        label: "Empresa",
        options: {
            filter: false,
            sort: true,
        },
    },
    {
        name: "debt",
        label: "Valor devido",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return toCurrency(value)
            },
        },
    },
    {
        name: "globalDebt",
        label: "Valor devido (Acumulado)",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const
                    { rowIndex, tableData } = tableMeta
                    , accValue = tableData.slice(0, rowIndex + 1)
                        .reduce((acc, curr) => {
                            //@ts-ignore
                            return acc + curr.debt
                        }, 0)

                return toCurrency(accValue)
            },
        },
    },
]
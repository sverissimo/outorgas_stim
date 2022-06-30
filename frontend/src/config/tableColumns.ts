import { MUIDataTableColumnOptions } from "mui-datatables"

interface Column {
    name: string,
    label: string,
    options: MUIDataTableColumnOptions
}

['razao_social', 'cnpj', 'codigo_empresa', 'data_assinatura', 'edital', 'n_parcelas', 'numero_contrato', 'valor_outorga']

export const columns: Column[] = [
    {
        name: "razao_social",
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
        name: "codigo_empresa",
        label: "Código da Empresa",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "data_assinatura",
        label: "Data de Assinatura",
        options: {
            filter: true,
            sort: true,
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
        name: "n_parcelas",
        label: "Número de Parcelas",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "numero_contrato",
        label: "Número do Contrato",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "linhas_id",
        label: "Linhas",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                console.log("🚀 ~ file: tableColumns.ts ~ line 80 ~ value", Array.isArray(value))
                return value.join()
            }
        }
    },
    {
        name: "valor_outorga",
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
import { toCurrency } from "../utils/formatNumber"

interface ContractInfoField {
    name: string,
    label: string,
    format?: any
}

export const contractInfoFields: ContractInfoField[] = [
    {
        name: "razaoSocial",
        label: "Razão Social",
        format: (value: any) => {
            return value.toUpperCase()
        },
    },
    {
        name: "cnpj",
        label: "CNPJ"
    },
    {
        name: "codigoEmpresa",
        label: "Código da Empresa"
    },
    {
        name: "numeroContrato",
        label: "Número do Contrato"

    },
    {
        name: "dataAssinatura",
        label: "Data de Assinatura",
        format: (value: any) => {
            return new Date(value).toLocaleDateString('pt-BR')
        },
    },
    {
        name: "edital",
        label: "Edital",
    },
    {
        name: "linhasId",
        label: "Linhas",
        format: (value: any) => {
            return value.join()
        }
    },
    {
        name: "nParcelas",
        label: "Número de Parcelas",
    },
    {
        name: "parcelasPagas",
        label: "Pagamentos efetuados",
    },
    {
        name: "valorOutorga",
        label: "Valor da Outorga",
        format: (value: any) => {
            return toCurrency(Number(value))
        }
    },
    {
        name: "saldoDevedor",
        label: "Saldo Devedor",
        format: (value: any) => {
            return toCurrency(value)
        }
    }
]
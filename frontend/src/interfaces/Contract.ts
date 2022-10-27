import { Payment } from "./Payment"

export interface Contract {
    cnpj: string
    codigoEmpresa: number
    razaoSocial?: string
    dataAssinatura: string
    edital: string
    linhasId?: number[]
    valorOutorga: number
    nParcelas?: number
    numeroContrato: string
    pagamentos?: Payment[] | []
    saldoDevedor?: number
    parcelasPagas?: number
    carencia?: number
    convalidacao?: number
    valorDevido?: number
}
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
    pagamentos?: any
    saldoDevedor?: number
    parcelasPagas?: number
}
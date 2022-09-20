export interface Contract {
    cnpj: String
    codigoEmpresa: String
    dataAssinatura: String
    edital: String
    linhasId?: String
    valorOutorga: number
    nParcelas: String
    numeroContrato: String
    pagamentos?: any
    saldoDevedor: number
}
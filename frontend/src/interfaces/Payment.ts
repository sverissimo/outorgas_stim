export interface Payment {
    numeroGuia: string
    codigoEmpresa?: number
    dataPagamento: string
    valor: number
    linhasId?: string | number[]
}
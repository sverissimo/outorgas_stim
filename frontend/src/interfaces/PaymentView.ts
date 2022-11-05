export interface PaymentView {
    mes: any
    numeroGuia?: string
    tjlp: number
    tjlpEfetiva: number
    saldoAntesPg?: number
    valorPago: number
    saldoDevedor: number
    saldoAtualizado?: number
    reajuste?: number
    valorNovaOutorga?: number
    contratos?: string[]
}
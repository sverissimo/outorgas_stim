export interface Contract {
    cnpj: String,
    codigo_empresa: String,
    data_assinatura: String,
    edital: String,
    linhas_id?: String,
    n_parcelas: String,
    numero_contrato: String,
    pagamentos?: any
}
export interface Debt {
    codigoEmpresa?: number;
    contratos: string[];
    data: string;
    dataVigencia?: string | Date;
    carencia: number;
    valorDevido: number;
}
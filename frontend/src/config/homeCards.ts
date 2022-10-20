type HomeCard = {
    cardTitle: string;
    cardContent: string[];
}

export const homeCards: HomeCard[] = [
    {
        cardTitle: 'Contratos',
        cardContent: [
            '752 contratos vigentes',
            '110 contratos com débitos'
        ]
    },
    {
        cardTitle: 'Empresas',
        cardContent: [
            '162 empresas com contratos vigentes',
            '36 empresas com débitos de outorgas'
        ]
    },
    {
        cardTitle: 'Pagamentos',
        cardContent: [
            '15.786 guias registradas no SICAR',
            '12.581 registros de pagamento até 17/10/2022*',
        ]
    },
    {
        cardTitle: 'Saldo',
        cardContent: [
            'R$ 9.530.048,87 de saldo devedor**',
            '6 empresas representam 68,7% do saldo devedor'
        ]
    },
]

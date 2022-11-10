type HomeCard = {
    cardTitle: string;
    cardContent: (cardData: string | number) => string[];
}

export const homeCards: HomeCard[] = [
    {
        cardTitle: 'Contratos',
        cardContent: cardData => [
            '752 contratos vigentes',
            `${cardData} contratos com débitos`
        ]
    },
    {
        cardTitle: 'Empresas',
        cardContent: cardData => [
            '162 empresas com contratos vigentes',
            `${cardData} empresas com débitos de outorgas`
        ]
    },
    {
        cardTitle: 'Pagamentos',
        cardContent: () => [
            '15.786 guias registradas no SICAR',
            '12.581 registros de pagamento até 17/10/2022',
        ]
    },
    {
        cardTitle: 'Saldo',
        cardContent: cardData => [
            `${cardData} de saldo devedor*`,
            '6 empresas representam 79% do saldo devedor'
        ]
    },
]

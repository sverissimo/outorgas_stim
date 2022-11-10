import { homeCards } from "../config/homeCards"
import '../components/home.scss'
import { FC, useContext } from "react"
import { GlobalDataContext } from "../context/GlobalDataContext"


export const Home: FC = () => {
    const { contratos, devedores, totalDebt } = useContext(GlobalDataContext)
        , debtContractsCount = contratos.length
        , debtorsCount = devedores.length
        , cardData = [debtContractsCount, debtorsCount, null, totalDebt]

    return (
        <div className="homeContainer">
            <main className="homeJumbotron">
                <h2 className="homeJumbotron__title">
                    Sistema de gestão de débitos de outorga
                </h2>
                <h4 className="homeJumbotron__subtitle">
                    Outorgas em números:
                </h4>
                <section className="homeCardContainer">
                    {
                        homeCards.map(({ cardTitle, cardContent }, i) =>
                            <div className="homeCard" key={cardTitle}>
                                <div className="homeCardTitle">
                                    {cardTitle}
                                </div>
                                <div>
                                    {cardContent(cardData[i] || '').map((text, i) =>
                                        <div className="cardText" key={i}>
                                            • {text}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                </section>
                <section className="homeInfo">
                    Para iniciar, acesse o menu no canto superior esquerdo da tela.
                </section>
            </main>

            <footer className="homeFooter">
                * Não foram considerados os reajustes de 3,4% dos contratos de 2012 que foram aditados.
                ** O saldo devedor não considera o reajuste pela Selic dos 10 contratos de 2009 e 2 de 2010. No entanto, o valor integral desses contratos somados é de menos de 5% do saldo devedor atual.
                As empresas devedoras signatárias de tais contratos são Samaritana, Exdil, TransTur, Vale do Ouro, Panorama e São Pedro.
                <br />
                Dados atualizados em 17/10/2022
            </footer>
        </div>
    )
}

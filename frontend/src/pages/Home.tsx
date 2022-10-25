import { homeCards } from "../config/homeCards"
import '../components/home.scss'


export const Home = () => {
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
                        homeCards.map(({ cardTitle, cardContent }) =>
                            <div className="homeCard" key={cardTitle}>
                                <div className="homeCardTitle">
                                    {cardTitle}
                                </div>
                                <div>
                                    {cardContent.map((text, i) =>
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
                * Desses pagamentos, 69 não foram contabilizados pois foram realizados por 2 empresas sem vínculo contratual (Paratur e Noroeste).
                <br />
                ** Saldo devedor não considera os pagamentos citados, que totalizam R$426.476,93
                <br />
                Dados atualizados em 17/10/2022
            </footer>
        </div>
    )
}
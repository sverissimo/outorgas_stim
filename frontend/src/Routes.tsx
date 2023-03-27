import { Routes, Route } from "react-router-dom"
import { EmpresaDebts } from "./pages/EmpresaDebts"
import { Contratos } from "./pages/Contratos"
import { Migrations } from "./api/Migrations"
import { Relatorios } from "./pages/Relatorios"
import { DebtorsList } from "./pages/DebtorsList"
import { Home } from "./pages/Home"
import { useContext } from "react"
import { UserContext } from "./contexts/UserContext"
import { getCookie } from "./auth/utils/manageCookies"
import { UserAuth } from "./auth/UserAuth"

export const AppRouter = () => {
    const { user } = useContext(UserContext)
    const loggedIn = getCookie('loggedIn').length > 0
    if (!loggedIn) {
        return <UserAuth />
    }

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/relatorios' element={<Relatorios />} />
            <Route path='/contratos' element={<Contratos />} />
            <Route path='/empresas' element={<EmpresaDebts />} />
            <Route path='/devedores' element={<DebtorsList />} />
            <Route path='/migrations' element={<Migrations />} />
        </Routes>
    )

}
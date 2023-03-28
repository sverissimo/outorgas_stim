import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import { Migrations } from "./api/Migrations"
import { Contratos, DebtorsList, EmpresaDebts, Home, Relatorios } from './pages'
import { UserContext } from "./contexts/UserContext"
import { UserAuth } from "./auth/UserAuth"
import { Loading } from "./components/Loading"
import { useSessionTimer } from "./auth/hooks/useSessionTimer"

export const AppRouter = () => {
    const { user } = useContext(UserContext)
    const { sessionExpired, isPending } = useSessionTimer()

    if (isPending) {
        return <Loading />
    }

    if (!user.isLoggedIn || sessionExpired) {
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

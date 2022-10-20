import { Routes, Route } from "react-router-dom"
import { EmpresaDebts } from "./pages/EmpresaDebts"
import { Contratos } from "./pages/Contratos"
import { Migrations } from "./api/Migrations"
import { Relatorios } from "./pages/Relatorios"
import { DebtorsList } from "./pages/DebtorsList"
import { Home } from "./pages/Home"

export const AppRouter = () => {
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

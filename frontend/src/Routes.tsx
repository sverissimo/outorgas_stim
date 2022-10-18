import { Routes, Route } from "react-router-dom"
import { Contract } from "./pages/Contract"
import { EmpresasDebt } from "./pages/EmpresasDebt"
import { Contratos } from "./pages/Contratos"
import { Migrations } from "./api/Migrations"
import { Relatorios } from "./pages/Relatorios"
import { DebtorsList } from "./pages/DebtorsList"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Relatorios />} />
            <Route path='/contratos' element={<Contratos />} />
            <Route path='/contrato/:numeroContrato' element={<Contract />} />
            <Route path='/empresas' element={<EmpresasDebt />} />
            <Route path='/devedores' element={<DebtorsList />} />
            <Route path='/migrations' element={<Migrations />} />
        </Routes>
    )
}

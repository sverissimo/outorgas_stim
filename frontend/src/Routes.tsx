import { Routes, Route } from "react-router-dom"
import { Contract } from "./pages/Contract"
import { EmpresasDebt } from "./pages/EmpresasDebt"
import { OutorgaTable } from "./pages/OutorgaTable"
import { Migrations } from "./api/Migrations"
import { Relatorios } from "./pages/Relatorios"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<OutorgaTable />} />
            <Route path='/outorgas' element={<OutorgaTable />} />
            <Route path='/contrato/:numeroContrato' element={<Contract />} />
            <Route path='/empresas' element={<EmpresasDebt />} />
            <Route path='/migrations' element={<Migrations />} />
            <Route path='/relatorios' element={<Relatorios />} />
            {/* <Route path=':numeroContrato' />

            </Route> */}
        </Routes>
    )
}

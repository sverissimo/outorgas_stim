import { Routes, Route } from "react-router-dom"
import { Contract } from "./pages/Contract"
import { OutorgaTable } from "./pages/OutorgaTable"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<OutorgaTable />} />
            <Route path='/outorgas' element={<OutorgaTable />} />
            <Route path='/contrato/:numeroContrato' element={<Contract />} />
            {/* <Route path=':numeroContrato' />

            </Route> */}
        </Routes>
    )
}

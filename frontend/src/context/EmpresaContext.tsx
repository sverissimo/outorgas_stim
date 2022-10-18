import { createContext } from "react";
import { DevedorView } from "../interfaces/DevedorView";


interface IEmpresaContext {
    devedores: DevedorView[]
    empresaFilter: number[]
    setEmpresaFilter: (empresaCodes: number[]) => void
    setDevedores: (devedores: DevedorView[]) => void
}

export const EmpresaContext = createContext<IEmpresaContext>({
    devedores: [],
    empresaFilter: [] as number[],
    setEmpresaFilter: () => void 0,
    setDevedores: () => void 0
})

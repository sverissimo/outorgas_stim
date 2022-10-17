import { createContext } from "react";

interface IEmpresaContext {
    empresaFilter: number[]
    setEmpresaFilter: (empresaCodes: number[]) => void
}

export const EmpresaContext = createContext<IEmpresaContext>({
    empresaFilter: [] as number[],
    setEmpresaFilter: () => void 0
})

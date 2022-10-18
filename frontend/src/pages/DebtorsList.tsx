import { useContext } from 'react'
import { DataTable } from '../components/DataTable'
import { debtorListColumns } from '../config/debtorsListTable'
import { EmpresaContext } from '../context/EmpresaContext'


export const DebtorsList = () => {
    const { devedores } = useContext(EmpresaContext)

    return (
        <div>
            <DataTable
                title='Listagem das empresas com débitos de outorga'
                data={devedores}
                columns={debtorListColumns}
            />
        </div>
    )
}

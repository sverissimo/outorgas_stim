import { useContext } from 'react'
import { DataTable } from '../components/DataTable'
import { debtorListColumns } from '../config/debtorsListTable'
import { GlobalDataContext } from '../context/GlobalDataContext'


export const DebtorsList = () => {
    const { devedores } = useContext(GlobalDataContext)
        , today = new Date().toLocaleDateString()

    //const parseXlsData = 
    return (
        <div className='container'>
            <DataTable
                title='Listagem das empresas com débitos de outorga'
                data={devedores}
                columns={debtorListColumns}
                fileName={`Débito empresas - ${today}`}
            />
        </div>
    )
}

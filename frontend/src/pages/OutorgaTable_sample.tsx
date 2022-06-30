import { useQuery } from "react-query"
import { Api } from "../api/Api"
import MUIDataTable from 'mui-datatables';

interface IContract {
    cnpj: String,
    codigo_empresa: String,
    data_assinatura: String,
    edital: String,
    linhas_id?: String,
    n_parcelas: String,
    numero_contrato: String,
    pagamentos?: any
}

export const OutorgaTable = () => {

    const columns = ["Name", "Company", "City", "State"];

    const data = [
        ["Joe James", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT"],
        ["Bob Herm", "Test Corp", "Tampa", "FL"],
        ["James Houston", "Test Corp", "Dallas", "TX"],
    ];

    const options = {
        caseSensitive: false
    };

    return (
        <>
            <div>whatev</div>
            <MUIDataTable
                title={"Employee List"}
                data={data}
                columns={columns}
                options={options}
            />
        </>

    )
}

{/* <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
        /> */}
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom"
import { IContract } from "./OutorgaTable"

export const Contract = (props: Partial<IContract>) => {

    const
        { numeroContrato: string } = useParams()
        , location = useLocation()
        , { state, pathname } = location

    console.log("🚀 ~ file: Contract.tsx ~ line 9 ~ Contract ~ location", state, pathname)

    return (
        <>
            <div>Contract</div>
            <Link to='/outorgas'>
                Back to outorgas
            </Link>
            {/* <Outlet /> */}
        </>
    )
}

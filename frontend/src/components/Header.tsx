import { useQueryClient } from "react-query"

export const Header = () => {
    const data = useQueryClient()
    return (
        <div>Header</div>
    )
}

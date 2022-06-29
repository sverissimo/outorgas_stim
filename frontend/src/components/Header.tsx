import { useQueryClient } from "react-query"

export const Header = () => {
    const data = useQueryClient()
    console.log("🚀 ~ file: Header.tsx ~ line 5 ~ Header ~ data", data)
    return (
        <div>Header</div>
    )
}

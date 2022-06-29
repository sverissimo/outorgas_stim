import { useState } from "react"
import { useQuery } from "react-query"
import { Api } from "../api/Api"

export const OutorgaTable = () => {

    const api = new Api()

    const { isLoading, data, error } = useQuery('tst', () => api.get('/api'), { cacheTime: 0, retry: false })
    console.log("🚀 ~ file: OutorgaTable.tsx ~ line 10 ~ OutorgaTable ~ data", data)

    if (isLoading)
        return <h1> "Loading..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>

    return (
        <div>{data} - OutorgaTable</div>
    )
}

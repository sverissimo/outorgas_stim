export class Api {

    get = async (url: string) => {
        const response: Response = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        return await response.json()
    }

    post = async (url: string, data: Object) => {
        const response: Response = await fetch(url, {
            method: 'POST',
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache,
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return response
    }
}

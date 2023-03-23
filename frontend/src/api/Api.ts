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
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return response
    }
}

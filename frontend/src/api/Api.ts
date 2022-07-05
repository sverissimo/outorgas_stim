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
}

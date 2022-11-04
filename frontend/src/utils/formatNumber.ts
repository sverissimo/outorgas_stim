export const twoDigits = (value: number): number => {
    return Number(value.toFixed(2))
}

export const toPercentage = (value: number): string => {
    value = Number((value * 100).toFixed(4))
    let formatted: string = '' + value
    return formatted.replace('.', ',') + '%'
}

export const toCurrency = (value: number): string => {
    const formatted: string = 'R$ ' + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    /* 
    ----------------> Caso de incompatibilidade do browser, reverter para a função abaixo:
    formatted = formatted.replace('.', ',') 
    const cents = formatted.slice(formatted.indexOf(','), -1)
    if (cents.length === 1)
        formatted += '0'
    */
    return formatted
}
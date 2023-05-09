export interface Currency {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    symbol: string
    show_currency_symbol_on_right_side: boolean
    fraction: string
    fraction_units: number
    smallest_currency_fraction_value: number
}

export interface CurrenciesResponse {
    "data": Currency[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
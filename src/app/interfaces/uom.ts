export interface Uom {
    id: string
    name: string
    symbol: string
    abbreviation: string
    created_at: Date
    updated_at: Date
}

export interface UomsResponse {
    "current_page": number
    "data": Uom[],
    "first_page_url": string
    "from": number
    "last_page": number
    "last_page_url": string,
    // "links": Link[],
    "next_page_url": string | null
    "path": string
    "per_page": number
    "prev_page_url": string | null
    "to": number
    "total": number
}
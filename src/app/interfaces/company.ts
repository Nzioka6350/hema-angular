export interface Company {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    abbr: string
    domain: string
    country: string
    date_of_establishment: string
    isGroup: boolean
}

export interface CompaniesResponse {
    "data": Company[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
export interface Address {
    id: string
    postal_code: string
    street: string
    webUrl: string
    city: string
    fax_no: string
    tel: string
    email: string
    created_at: Date
    updated_at: Date
}

export interface AddresssResponse {
    "current_page": number
    "data": Address[],
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
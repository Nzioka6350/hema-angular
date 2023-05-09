export interface User {
    id: string
    name: string
    email: string
    email_verified_at: string
    created_at: Date
    updated_at: Date
}

export interface UsersResponse {
    "current_page": number
    "data": User[],
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
export interface Department {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    isGroup: boolean
}

export interface DepartmentsResponse {
    "data": Department[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
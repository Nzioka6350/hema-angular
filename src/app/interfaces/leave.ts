export interface Leave {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    description: string
    max_allocation: number
    applicable_after: number
    is_without_pay: boolean
    includes_holidays: boolean
    allow_over_allocation: boolean
    available: boolean
}

export interface LeaveTypesResponse {
    "data": Leave[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
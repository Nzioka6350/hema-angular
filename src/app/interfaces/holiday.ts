export interface Holiday {
    id: string
    created_at: Date
    updated_at: Date
    description: string
    date: Date
}

export interface HolidaysResponse {
    "data": Holiday[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
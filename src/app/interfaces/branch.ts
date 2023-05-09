export interface Branch {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    isGroup: boolean
}

export interface BranchiesResponse {
    "data": Branch[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
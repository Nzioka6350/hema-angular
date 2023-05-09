export interface EmployeeOnboarbing {
    id: string
    created_at: Date
    updated_at: Date
    date_of_joining: Date
    name: string
    notify: boolean
    aborted: boolean
}

export interface EmployeeOnboarbingsResponse {
    "data": EmployeeOnboarbing[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
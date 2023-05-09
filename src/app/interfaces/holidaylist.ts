export interface HolidayList {
    id: string
    created_at: Date
    updated_at: Date
    from_date: Date
    to_date: Date
}

export interface HolidayListsResponse {
    "data": HolidayList[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
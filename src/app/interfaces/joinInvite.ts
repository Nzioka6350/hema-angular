export interface JoinInvite {
    id: string
    created_at: Date
    updated_at: Date
    email: string
    revoked: boolean
    revokes_in: number | null
}

export interface JoinInvitesResponse {
    "data": JoinInvite[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
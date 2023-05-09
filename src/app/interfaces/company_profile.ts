import { Address } from "./Address"

export interface CompanyProfile {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    license_no: number
    vat_no: string
    pin_no: string
    boardCode: string
    address: Address
}

export interface CompanyProfileResponse {
    "data": CompanyProfile[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
import { CompanyProfile } from "./company_profile"
import { Grower } from "./grower"

export interface Registration {
    id: string
    name_of_miller: string
    company_profile: CompanyProfile
    physical_address: string
    grower: Grower
    month: Date
    milling_date: Date
    date_of_delivery: Date
    created_at: Date
    updated_at: Date
}

export interface RegistrationsResponse {
    "current_page": number
    "data": Registration[],
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
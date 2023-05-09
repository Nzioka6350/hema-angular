import { Address } from "./Address"
import { CoffeeType } from "./coffeetype"
import { Grower } from "./grower"

export interface PurchaseReciept {
    id: string
    grower: Grower
    coffee_type: CoffeeType[]
    bay: number
    bags_in_outturn: number
    bags_in_delivery: number
    delivery_vehicle_no: string
    store: string
    floor: string
    row: string
    bags_in: string
    created_at: Date
    updated_at: Date
}

export interface PurchaseRecieptsResponse {
    "current_page": number
    "data": PurchaseReciept[],
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
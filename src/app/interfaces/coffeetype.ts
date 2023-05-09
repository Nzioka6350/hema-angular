import { CoffeeGrade } from "./coffeegrade"

export interface CoffeeType {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    grades: CoffeeGrade[]
}

export interface CoffeeTypesResponse {
    "data": CoffeeType[],
    "path": string,
    "per_page": number,
    "next_cursor": string | null,
    "next_page_url": string | null,
    "prev_cursor": string | null,
    "prev_page_url": string | null
}
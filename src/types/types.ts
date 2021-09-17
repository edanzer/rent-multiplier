export interface LocationData {
    id: number,
    location: string,
    averageHomeValue: number,
    averageRent: number|null,
    grossRentMultiplier: number|null
}

export interface LocationCard {
    id: number,
    location: string,
    averageHomeValue: string,
    averageRent: string,
    grossRentMultiplier: string
}
interface userCreditCard {
    number: string,
    bank: string,
    expiresAt: string,
    cardCode: string
}

export interface userProps {
    id: number,
    name: string,
    email: string,
    image?: File,
    password: string,
    role: string,
    phoneNumber?: string,
    address?: string,
    houseNumber?: number | null,
    city?: string,
    state?: string,
    country?: string,
    postalCode?: string,
    creditCard?: userCreditCard,
    createdAt?: Date,
    updateddAt?: Date,
}
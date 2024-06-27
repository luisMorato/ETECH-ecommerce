export interface dbCreditCard {
    id: number,
    userId: number,
    number: string,
    bank: string,
    expiresAt: string,
    cardCode: string
}

export interface requestCreditCardData {
    number: string,
    bank: string,
    expiresAt: string,
    cardCode: string,
    userId: number
}

export interface CreditCardUseCasesProps {
    addCreditCard: ({ number, bank, expiresAt, cardCode, userId }: requestCreditCardData) => Promise<{ creditCard: dbCreditCard, message: string } | undefined>
    deleteCreditCard: (number: string, userId: number) => void
}

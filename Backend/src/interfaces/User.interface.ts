interface userCreditCard {
    number: string,
    bank: string,
    expiresAt: string,
    cardCode: string
}

export interface DbUserProps {
    id: number,
    name: string,
    email: string,
    image: string | null,
    password: string,
    role: string, //'USER'| 'ADMIN'
    phoneNumber: string | null,
    address: string | null,
    houseNumber: number | null,
    city: string | null,
    state: string | null,
    country: string | null,
    postalCode: string | null,
    creditCard?: userCreditCard | null
}

export interface requestUserProps {
    name: string
    email: string
    password: string
}

interface createUserProps {
    user: DbUserProps | null | undefined,
    message: string
}

type deleteUserProps = createUserProps;

export interface editUser {
    name: string,
    email: string,
    password: string,
    newPassword?: string,
    phoneNumber?: string,
    address?: string,
    houseNumber?: string,
    city?: string,
    state?: string,
    country?: string,
    postalCode?: string,
}

export interface queryData {
    pageIndex?: number,
    perPage: number,
    search?: string
}

export interface userUseCasesProps {
    createUser: (props: requestUserProps) => Promise<createUserProps | { error: string } | undefined>,
    updateUser: (data: editUser, userId: number, fileName?: string) => void,
    deleteUser: (userId: number) => Promise<deleteUserProps | null | undefined>,
    getUniqueUser: (userId: number) => Promise<DbUserProps | null | undefined>,
    getUserbyEmail: (email: string) => Promise<DbUserProps | null | undefined>,
    getAllUsers: (data: queryData) => Promise<{users: Omit<DbUserProps, 'password'>[], quantity: number | undefined} | undefined>,
}
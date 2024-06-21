export interface DbcommentsProps {
    id: number,
    productId: number,
    userId: number,
    text: string,
}

export interface commentProps {
    productId: number,
    userId: number,
    text: string,
}

export interface commentsUseCasesProps {
    createComment: ({ productId, userId, text }: commentProps) => Promise<DbcommentsProps | null | undefined>
}
interface chatMessages {
    text: string,
    createdAt: Date
}

export interface dbChatProps {
    id: number,
    user: {
        id: number,
        name: string,
    },
    messages: chatMessages[]
} 

export interface ChatUseCasesProps {
    //createChatMessage: () => 
}
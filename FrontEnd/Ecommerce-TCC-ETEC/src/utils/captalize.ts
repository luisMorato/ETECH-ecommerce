//Function That Returns The First Character in Uppercase
export const captilze = (text: string): string => {
    return text[0].toUpperCase() + text.substring(1, text.length);
}
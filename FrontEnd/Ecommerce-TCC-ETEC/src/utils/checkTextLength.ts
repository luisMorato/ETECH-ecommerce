//Function That Receives some Text, and Returns a SubString of the Text, Based on the Value Passed as Parameter
export const checkTextLength = (text: string, maxLength: number): string => {
    if(text.length > maxLength){
        return text.substring(0, maxLength) + " ..."
    }
    return text;
}
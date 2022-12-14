
export default function TextPaginate(data,number){

    const text = Array.isArray(data) ? data.join(', '): data

    if(number <= 0){
        return text
    }

    if(text.length <= number){
        return text
    }

    return text.substring(0,number) + "..."
}
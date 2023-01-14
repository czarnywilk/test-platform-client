
function validationError(message){

    return {
        status: 'Error',
        message: message
    }
}

export default function QuestionValidator(questions){
    try{
        if(questions.length <= 0){
            throw new Error("Dodaj przynajmniej jedno pytanie")
        }

        questions.map((question,index) => {
            if(question.form.length <= 0){
                throw new Error(`Brak odpowiedzi w Pytaniu ${index+1}`)
            }
    
            const answers = question.form.map(item => item.isCorrect)
            if(!answers.includes(true)){
                throw new Error(`Brak poprawnych odpowiedzi w Pytaniu ${index+1}`)
            }

            return 0;
        })

    }catch(error){
        return validationError(error.message)
    }

    return {
        status: 'Success'
    }
}
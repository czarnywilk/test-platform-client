
export default function convertForm(data){

    return data.map((item) => {

        const { question, form} = item

        let answerArray = []
        let correctAnswers = []

        form.map((item, index) => {
            answerArray.push(item.answer)

            if (item.isCorrect) {
                correctAnswers.push(index)
            }

            return true
        })

        let toSend = {
            question: question,
            answers: answerArray,
            correct_answer_idx: correctAnswers
        }

    

        return toSend
    })
}
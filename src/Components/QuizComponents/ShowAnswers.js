import Checkbox from "../UI/Checkbox";

export default function ShowAnswers({ questions, questionIdx, playerAnswers, onChange }){
    return (
        <div>
            {questions[questionIdx].answers.map((answers, i) => (
                <div key={i}>
                    <Checkbox
                        text={answers}
                        onChange={() => onChange(i)}
                        id={i}
                        multiple
                        checked={playerAnswers[questionIdx].includes(i)} />
                </div>
            ))}
        </div>
    )
}

const PAGINATION = 2


export default function showPagination({ questions, questionIdx, onClick }) {


    const buttonStyle = (id) => {
        if (questionIdx === id) {
            return "btn btn-primary text-center pagination-button"
        } else {
            return "btn btn-outline-primary text-center pagination-button border-0"
        }
    }



    const pagination = questions.map((index, i) => {
        if (questionIdx + PAGINATION >= i && i >= questionIdx - PAGINATION) {
            return (
                <button type="button"
                    className={buttonStyle(i) + " noRoundAll"}
                    key={i}
                    onClick={e => onClick(e, i)}>{i + 1}
                </button>
            )
        }
    })

    const first = (
        <button type="button"
            className={buttonStyle(0) + " me-2 text-center noRoundRight"}
            onClick={e => onClick(e, 0)}>{1}.
        </button>
    )

    const last = (
        <button type="button"
            className={buttonStyle(questions.length - 1) + " ms-2 text-center noRoundLeft"}
            onClick={e => onClick(e, questions.length - 1)}>.{questions.length}
        </button>
    )

    return (
        <div>
            {(questionIdx - PAGINATION > 0) && first}
            {pagination}
            {(questionIdx + PAGINATION < questions.length - 1) && last}
        </div>
    )
}
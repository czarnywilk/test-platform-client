
export default function myRound(number, decimal) {
    return (Math.round(number * (10 ** decimal)) / (10 ** decimal))
}
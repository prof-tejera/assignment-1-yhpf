import "./TimersStyle.css";

const DisplayRounds = ({timedOut, roundsLeft, originalRounds}) => {
    return (
        <div className="roundsDisplay">
            {timedOut && roundsLeft === 1 ? <span>Rounds are up!</span> : <span>{roundsLeft} / {originalRounds}</span>}   
        </div>
    )
}   

export default DisplayRounds;
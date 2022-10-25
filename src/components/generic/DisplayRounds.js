const DisplayRounds = ({timedOut, roundsLeft}) => {
    return (
        <div className="roundsDisplay">
            <p className="timer-text">Rounds</p>
            {timedOut && roundsLeft === 1 ? <span>Rounds are up!</span> : roundsLeft }
        </div>
    )
}   

export default DisplayRounds;
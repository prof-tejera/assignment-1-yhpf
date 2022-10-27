const DisplayTime = ({ time, showTimeUp=false, isActive=true }) => {

    // https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours

    const formatTime = time => {
        const tenth = time % 1000 / 10
        const seconds = Math.floor(time / 1000) % 60
        const minutes = (Math.floor((time / 1000)) - seconds)/60
    
        return [
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
            tenth.toString().padStart(2, "0")
        ].join(":");
    }

    let timeForDisplay = formatTime(time)

    return (
        <div className="timerDisplay">
            {showTimeUp && isActive && time === 0 ? <span>Time is up!</span> : timeForDisplay }
        </div>
    )
}   

export default DisplayTime;

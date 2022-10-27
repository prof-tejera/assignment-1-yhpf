import Button from "./Button";

// https://www.w3schools.com/icons/fontawesome_icons_video.asp

const ButtonPanel = ({ handleFastForward, handleReset, handlePauseResume, isPaused }) => {
    return (
        <div className="buttons">
        <Button
            className="fastforward fa fa-fast-forward" 
            onClick={handleFastForward}
            text=""
            title="fast forward"
        />
        <Button
            className="reset fa-solid fa-rotate-left" 
            onClick={handleReset}
            text=""
            title="reset"
        />
        <Button
            className="pause-resume" 
            onClick={handlePauseResume}
            text={isPaused ? <i class="fa fa-play"></i> : <i class="fa fa-pause"></i>}
            title={isPaused ? "resume" : "pause"}
        />
    </div>
    );
  };

export default ButtonPanel;


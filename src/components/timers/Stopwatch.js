import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import Button from "../generic/Button";
import "../generic/TimersStyle.css";

//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [capTime, setCapTime] = useState(359900)

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    // Timer functionality
    useEffect(() => {
        let timer = null;
        if (isActive && isPaused === false) {
        timer = setInterval(() => {
            setTime(time => time+1);
            }, 10);
        } else if (!isActive && time !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isActive, isPaused, time]);

    // Buttons functionality 
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
      
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    // FF-button with cap time 59 minutes and 59 seconds
    const handleFastForward = () => {
        setIsActive(true);
        setIsPaused(true);
        setTime(capTime);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    // Buttons panel
    const StartButton = (
        <div>
            <div>
                <Button 
                    className="start fa fa-play" 
                    onClick={handleStart}
                    text=""
                />
            </div>
        </div>
    );

    // https://www.w3schools.com/icons/fontawesome_icons_video.asp

    const ActiveButtons = (
        <div className="buttons">
            <Button
                className="fastforward fa fa-fast-forward" 
                onClick={handleFastForward}
                text=""
            />
            <Button
                className="reset fa-solid fa-rotate-left" 
                onClick={handleReset}
                text=""
            />
            <Button
                className="pause-resume" 
                onClick={handlePauseResume}
                text={isPaused ? <i class="fa fa-play"></i> : <i class="fa fa-pause"></i>}
            />
        </div>
    );

    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    return (
        <Panel>
            <div className="panel">
                <p className="p-text">Cap time: 59 minutes and 59 seconds</p>
                <br />
                <div className="timerArea">
                    <DisplayTime time={time*10} />
                    <div className="buttonPanel">
                        <div>{isActive ? ActiveButtons : StartButton}</div>
                    </div>
                </div>
            </div>
        </Panel>
    );
};


export default Stopwatch;
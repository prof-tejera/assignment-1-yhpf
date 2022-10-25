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
                    className="start" 
                    onClick={handleStart}
                    text="Start"
                />
            </div>
        </div>
    );
    const ActiveButtons = (
        <div className="buttons">
            <Button
                className="fastforward" 
                onClick={handleFastForward}
                text="Fast Forward"
            />
            <Button
                className="reset" 
                onClick={handleReset}
                text="Reset"
            />
            <Button
                className="pause-resume" 
                onClick={handlePauseResume}
                text={isPaused ? "Resume" : "Pause"}
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
                <DisplayTime time={time*10} />
                <div className="buttonPanel">
                    <div>{isActive ? ActiveButtons : StartButton}</div>
                </div>
            </div>
        </Panel>
    );
};


export default Stopwatch;
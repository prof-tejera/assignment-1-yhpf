import React, { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import Button from "../generic/Button";
import ButtonPanel from "../generic/ButtonPanel";
import "../generic/TimersStyle.css";

//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const capTime = 359900;

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
                    title="start"
                />
            </div>
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
                    <div>{isActive ? <ButtonPanel handleFastForward={handleFastForward} handlePauseResume={handlePauseResume} handleReset={handleReset} isPaused={isPaused} /> : StartButton}</div>
                    </div>
                </div>
            </div>
        </Panel>
    );
};


export default Stopwatch;
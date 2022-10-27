import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import Input from "../generic/Input";
import Button from "../generic/Button";
import ButtonPanel from "../generic/ButtonPanel";
import "../generic/TimersStyle.css";

// https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [originalTime, setOriginalTime] = useState(0);
    const timeRef = useRef(timeLeft);
    timeRef.current = timeLeft;

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    // Timer functionality
    useEffect(() => {
        if (isActive && isPaused === false) {
        const timer = setInterval(() => {
            if (timeRef.current > 0) {
                setTimeLeft(timeRef.current-10);
            } else {
                clearTimeout(timer);
            }
        }, 10);

        return () => clearTimeout(timer);
        };
    }, [isActive, isPaused]);

    // Buttons functionality 
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
      
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleFastForward = () => {
        setIsActive(false);
        setTimeLeft(0);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(originalTime);
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
                <p className="input-text">Time in seconds:</p>
                <Input 
                    timeChanged={(newTime) => { 
                        setTimeLeft(newTime*1000) 
                        setOriginalTime(newTime*1000)
                    }}
                    placeholder="input in seconds"
                />
                <br />
                <div className="timerArea">
                    <DisplayTime 
                        time={timeLeft}
                        showTimeUp={true}
                        isActive={isActive}
                    />
                    <div className="buttonPanel">
                    <div>{isActive ? <ButtonPanel handleFastForward={handleFastForward} handlePauseResume={handlePauseResume} handleReset={handleReset} isPaused={isPaused} /> : StartButton}</div>
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default Countdown;
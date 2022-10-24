import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import Button from "../generic/Button";
import "../generic/ButtonPanel.css";


//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [capTime, setCapTime] = useState(359900)

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

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

    // We have to have a FF-button
    // we hare expected to fast forward to a set cap time, our choice
    // cap time 59 minutes and 59 seconds
    const handleFastForward = () => {
        setIsActive(true);
        setTime(capTime);
    };
    // I only want to show reset button here!

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    // https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours

    // can this be it's own generic component?
    // Format display of inputed workout time
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
    
    const formattedTime = formatTime(time*10);

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

    // Move stuff to DisplayTime
    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    
    return (
        <Panel>
            <div className="panel">
                <p className="p-text">Cap time: 59 minutes and 59 seconds</p>
                <br />
                <div className="timerDisplay">
                    {formattedTime}
                </div>
                <DisplayTime 
                    time={time}
                    formattedTime={formattedTime}
                />
                <div className="buttonPanel">
                    <div>{isActive ? ActiveButtons : StartButton}</div>
                </div>
            </div>
        </Panel>
    );
};


export default Stopwatch;
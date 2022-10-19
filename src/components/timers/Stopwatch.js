import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import "../generic/ButtonPanel.css";
import Button from "../generic/Button";

//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const Stopwatch = () => {
    const [time, setTime] = useState(0);

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

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
      
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    // the ff button is disabled further down in the doc (a stop watch cant have a ff)
    const handleFastForward = () => {
        setIsActive(false);
        setTime(0);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    // https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours

    // can this be it's own generic component?
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
                className="disabled-fastforward" 
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
    
    return (
        <Panel>
            <div className="panel">
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

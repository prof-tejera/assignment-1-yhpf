import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Input from "../generic/Input";
import InputRounds from "../generic/InputRounds";
import Button from "../generic/Button";
import "../generic/ButtonPanel.css";

const XY = () => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [originalTime, setOriginalTime] = useState(0);
    const timeRef = useRef(timeLeft);
    timeRef.current = timeLeft;
    const originalTimeRef = useRef(originalTime);
    originalTimeRef.current = originalTime;

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    const [roundsLeft, setRoundsLeft] = useState(0);
    const [originalRounds, setOriginalRounds] = useState(0);
    const roundsRef = useRef(roundsLeft);
    roundsRef.current = roundsLeft;

    useEffect(() => {
        if (isActive && isPaused === false) {
        const timer = setInterval(() => {
            if (timeRef.current === 0 && roundsRef.current > 1){
                setRoundsLeft(roundsRef.current-1);
                setTimeLeft(originalTime);
            }
            else if (timeRef.current > 0) {
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
        setRoundsLeft(0);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(originalTime);
        setRoundsLeft(originalRounds);
    };

    // https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours

    // Format display of inputed workout time
    const formatTime = timeLeft => {
        const tenth = timeLeft % 1000 / 10
        const seconds = Math.floor(timeLeft / 1000) % 60
        const minutes = (Math.floor((timeLeft / 1000)) - seconds)/60
    
        return [
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
            tenth.toString().padStart(2, "0")
        ].join(":");
    }
    
    const formattedTime = formatTime(timeLeft);

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

    // Move stuff to DisplayTime and DisplayRounds
    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    
    return (
        <Panel>
            <div className="panel">
                <p className="input-text">Input number of rounds:</p>
                <InputRounds 
                    roundsChanged={(newRounds) => { 
                        setRoundsLeft(newRounds) 
                        setOriginalRounds(newRounds)
                    }}
                />
                <p className="input-text">Input time in seconds:</p>
                <Input 
                    timeChanged={(newTime) => { 
                        setTimeLeft(newTime*1000) 
                        setOriginalTime(newTime*1000)
                    }}
                />
                <br />
                <div className="roundsDisplay">
                    <p className="timer-text">Rounds</p>
                    {isActive && timeLeft === 0 && roundsLeft === 1 ? <span>Rounds are up!</span> : roundsLeft }
                </div>
                <div className="timerDisplay">
                    <p className="timer-text">Time</p>
                    {isActive && timeLeft === 0 ? <span>Time is up!</span> : formattedTime }
                </div>
                <DisplayRounds />
                <DisplayTime 
                    timeLeft={timeLeft}
                    formattedTime={formattedTime}
                />
                <div className="buttonPanel">
                    <div>{isActive ? ActiveButtons : StartButton}</div>
                </div>
            </div>
        </Panel>
    );
};

export default XY;

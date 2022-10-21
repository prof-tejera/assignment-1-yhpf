import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import DisplayRest from "../generic/DisplayRest";
import Input from "../generic/Input";
import InputRounds from "../generic/InputRounds";
import InputRest from "../generic/InputRest";
import Button from "../generic/Button";
import "../generic/ButtonPanel.css";

const Tabata = () => {
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
    const originalRoundsRef = useRef(originalRounds);
    originalRoundsRef.current = originalRounds;

    const [restLeft, setRestLeft] = useState(0);
    const [originalRest, setOriginalRest] = useState(0);
    const restRef = useRef(restLeft);
    restRef.current = restLeft;
    const originalRestRef = useRef(originalRest);
    originalRestRef.current = originalRest;

    // I need to restart timer time as long as rounds != 0
    // One timer lap is workout time + rest time
    useEffect(() => {
        if (isActive && isPaused === false) {
        const timer = setInterval(() => {
            if (timeRef.current === 0 && restRef.current === 0 && roundsRef.current > 1){
                setRoundsLeft(roundsRef.current-1);
                setTimeLeft(originalTime);
                setRestLeft(originalRest);
            }
            else if (timeRef.current > 0) {
                setTimeLeft(timeRef.current-10);
            } else if (restRef.current > 0) { 
                setRestLeft(restRef.current-10);
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
        setRestLeft(0);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(originalTime);
        setRoundsLeft(originalRounds);
        setRestLeft(originalRest);
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

    // Format display of inputed rest time
    const formatRest = restLeft => {
        const tenth = restLeft % 1000 / 10
        const seconds = Math.floor(restLeft / 1000) % 60
        const minutes = (Math.floor((restLeft / 1000)) - seconds)/60
    
        return [
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
            tenth.toString().padStart(2, "0")
        ].join(":");
    }
    
    const formattedRest = formatRest(restLeft);

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

    // Move stuff to DisplayTime, DisplayRounds, DisplayRest
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
                <p className="input-text">Input workout time in seconds:</p>
                <Input 
                    timeChanged={(newTime) => { 
                        setTimeLeft(newTime*1000) 
                        setOriginalTime(newTime*1000)
                    }}
                />
                <p className="input-text">Input rest time in seconds:</p>
                <InputRest 
                    restChanged={(newRest) => { 
                        setRestLeft(newRest*1000) 
                        setOriginalRest(newRest*1000)
                    }}
                />
                <br />
                <div className="roundsDisplay">
                    <p className="timer-text">Rounds</p>
                    {isActive && timeLeft === 0 & restLeft === 0 && roundsLeft === 1 ? <span>Rounds are up!</span> : roundsLeft }
                </div>
                <div className="timerDisplay">
                    <p className="timer-text">Workout time</p>
                    {isActive && timeLeft === 0 ? <span>Time is up!</span> : formattedTime }
                </div>
                <div className="restDisplay">
                    <p className="timer-text">Rest time</p>
                    {isActive && restLeft === 0 ? <span>Rest is up!</span> : formattedRest}
                </div>
                <DisplayRounds />
                <DisplayTime 
                    timeLeft={timeLeft}
                    formattedTime={formattedTime}
                />
                <DisplayRest />
                <div className="buttonPanel">
                    <div>{isActive ? ActiveButtons : StartButton}</div>
                </div>
            </div>
        </Panel>
    );
};

export default Tabata;

import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Input from "../generic/Input";
import Button from "../generic/Button";
import ButtonPanel from "../generic/ButtonPanel";
import "../generic/TimersStyle.css";

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

    // Timer functionality
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
    }, [isActive, isPaused, originalTime, originalRest]);

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
                <p className="input-text">Number of rounds:</p>
                <Input 
                    timeChanged={(newRounds) => { 
                        setRoundsLeft(newRounds) 
                        setOriginalRounds(newRounds)
                    }}
                    placeholder="number of rounds"
                />
                <p className="input-text">Workout time in seconds:</p>
                <Input 
                    timeChanged={(newTime) => { 
                        setTimeLeft(newTime*1000) 
                        setOriginalTime(newTime*1000)
                    }}
                    placeholder="input in seconds"
                />
                <p className="input-text">Rest time in seconds:</p>
                <Input
                    timeChanged={(newRest) => { 
                        setRestLeft(newRest*1000) 
                        setOriginalRest(newRest*1000)
                    }}
                    placeholder="input in seconds"
                />
                <br />
                <div className="timerArea">
                    <div className="roundsDisplay">
                        <p className="timer-text">Rounds</p>
                        <DisplayRounds
                            timedOut={isActive && timeLeft === 0 && restLeft === 0}
                            roundsLeft={roundsLeft}
                            originalRounds={originalRounds}
                        />
                    </div>
                    <div className="timerDisplay">
                        <p className="timer-text">Workout time</p>
                        <DisplayTime time={timeLeft} />
                    </div>
                    <div className="restDisplay">
                        <p className="timer-text">Rest time</p>
                        <DisplayTime time={restLeft} />
                    </div>
                    <div className="buttonPanel">
                        <div>{isActive ? <ButtonPanel handleFastForward={handleFastForward} handlePauseResume={handlePauseResume} handleReset={handleReset} isPaused={isPaused} /> : StartButton}</div>
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default Tabata;
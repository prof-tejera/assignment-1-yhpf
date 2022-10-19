import React, { useEffect, useState, useRef } from "react";
import ButtonPanel from "../generic/ButtonPanel";

const CountdownDisplay = (props) => {
    const [timeLeft, setTimeLeft] = useState(500);
    const timeRef = useRef(timeLeft);
    timeRef.current = timeLeft;

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        if (isActive && isPaused === false) {
        const timer = setInterval(() => {
            if (timeRef.current > 0) {
                setTimeLeft(timeRef.current-1);
            } else {
                clearTimeout(timer);
            }
        }, 10);

        return () => clearTimeout(timer);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
      
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };
      
    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(500);
    };

    // https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours

    const formatTime = timeLeft => {
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
        const seconds = Math.floor((timeLeft / 100) % 60)
        const tenth = Math.floor((timeLeft / 1) % 60)
    
        return [
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
            tenth.toString().padStart(2, "0")
        ].join(":");
    }
    
    const formattedTime = formatTime(timeLeft);

    return (
        <div>
            <h2>This timer is counting down</h2>
            {timeLeft ? formattedTime : <span>Time is up!</span>}
            <ButtonPanel
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
        </div>
    );
};

export default CountdownDisplay;
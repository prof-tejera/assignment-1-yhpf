import React, { useState } from "react";

// This is the input for time, rest AND rounds
// sorry about the names used!
// will fix the naming if I get time

const Input = ({timeChanged, placeholder}) => {
    const [inputTime, setInputTime] = useState("");

    const onChange = (e) => {
        setInputTime(e.target.value)
        timeChanged(e.target.value)
    }

    return (
        <form>
            <div>
                <label>
                    <input 
                        type="number" 
                        value={inputTime} 
                        onChange={onChange}
                        placeholder={placeholder}
                        className="time-input" 
                    />
                </label>
            </div>
        </form>
    );
};

export default Input;
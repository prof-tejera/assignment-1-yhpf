import React, { useState } from "react";

// This is the input for time, rest AND rounds
// sorry about the names used!
// will fix the naming if I get time

const Input = (props) => {
    const [inputTime, setInputTime] = useState("");

    const onChange = (e) => {
        setInputTime(e.target.value)
        props.timeChanged(e.target.value)
    }

    return (
        <form>
            <div>
                <label>
                    <input 
                        type="number" 
                        value={inputTime} 
                        onChange={onChange}
                        placeholder="input in seconds" 
                        className="time-input" 
                    />
                </label>
            </div>
        </form>
    );
};

export default Input;
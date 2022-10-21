import React, { useState } from "react";

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
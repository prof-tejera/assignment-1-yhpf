import React, { useState } from "react";
import "./Input.css";

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
                    <p className="ptext">Input time:
                    <br></br>
                    <input 
                        type="number" 
                        value={inputTime} 
                        onChange={onChange}
                        placeholder="enter inut in seconds" 
                        className="time-input" 
                    /> seconds
                    </p>
                </label>
            </div>
        </form>
    );
};

export default Input;
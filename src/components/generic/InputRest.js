import React, { useState } from "react";

const InputRest = (props) => {
    const [inputRest, setInputRest] = useState("");

    const onChange = (e) => {
        setInputRest(e.target.value)
        props.restChanged(e.target.value)
    }

    return (
        <form>
            <div>
                <label>
                    <input 
                        type="number" 
                        value={inputRest} 
                        onChange={onChange}
                        placeholder="input in seconds" 
                        className="time-input" 
                    />
                </label>
            </div>
        </form>
    );
};

export default InputRest;
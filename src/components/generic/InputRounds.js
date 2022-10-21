import React, { useState } from "react";

const InputRounds = (props) => {
    const [inputRounds, setInputRounds] = useState("");

    const onChange = (e) => {
        setInputRounds(e.target.value)
        props.roundsChanged(e.target.value)
    }

    return (
        <form>
            <div>
                <label>
                    <input 
                        type="number" 
                        value={inputRounds} 
                        onChange={onChange}
                        placeholder="number of rounds" 
                        className="rounds-input" 
                    />
                </label>
            </div>
        </form>
    );
};

export default InputRounds;
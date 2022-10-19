import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import "../generic/ButtonPanel.css";
import Button from "../generic/Button";

const Tabata = () => {

    return (
        <Panel>
            <div className="panel">
                <br />
                <div className="timerDisplay">
                    timer dispay
                </div>
                <DisplayTime />
                <div className="buttonPanel">
                    buttons
                </div>
            </div>
        </Panel>
    );
};

export default Tabata;

import React, { useEffect, useState, useRef } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import "../generic/ButtonPanel.css";
import Button from "../generic/Button";

// The input values for this times can be hardcoded for Assignment 1. 
// Was explained by professor in class
const XY = () => {

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

export default XY;

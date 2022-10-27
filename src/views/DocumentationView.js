import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import Button from "../components/generic/ButtonPanel";
import ButtonPanel from "../components/generic/Button";
import DisplayRounds from "../components/generic/DisplayRounds";
import DisplayTime from "../components/generic/DisplayTime";
import Input from "../components/generic/Input";
import Panel from "../components/generic/Panel";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />

        <DocumentComponent
          title="Button "
          component={<Button />}
          propDocs={[
            {
              prop: "className",
              description: "CSS class of the button.",
              type: "string",
            },
            {
              prop: "text",
              description: "Text to display on the button.",
              type: "string",
            },
            {
              prop: "onClick",
              description: "Method to run when you click the button.",
              type: "function",
            },
            {
              prop: "title",
              description: "Tooltip text to show (text to show on mouse over).",
              type: "string",
            }
          ]}
        />

        <DocumentComponent
          title="ButtonPanel "
          component={<ButtonPanel />}
          propDocs={[
            {
              prop: "handleFastForward",
              description: "Handle funcitonality when clicking Fast Forward button.",
              type: "function",
            },
            {
              prop: "handleReset",
              description: "Handle funcitonality when clicking Reset button.",
              type: "function",
            },
            {
              prop: "handlePauseResume",
              description: "Handle funcitonality when clicking Pause / Resume button.",
              type: "function",
            },
            {
              prop: "isPaused",
              description: "Indicates if the timer is paused or not.",
              type: "boolean",
            }
          ]}
        />

        <DocumentComponent
          title="DisplayRounds "
          component={<DisplayRounds />}
          propDocs={[
            {
              prop: "timedOut",
              description: "When timer is active and there is no time left on the timer.",
              type: "boolean",
            },
            {
              prop: "roundsLeft",
              description: "Rounds left in the XY or Tabata timer.",
              type: "number",
            },
          ]}
        />

        <DocumentComponent
          title="DisplayTime "
          component={<DisplayTime />}
          propDocs={[
            {
              prop: "time",
              description: "Time in milliseconds to display.",
              type: "number",
            },
            {
              prop: "showTimeUp",
              description: "If true, DisplayTime will say 'Time is up!' when time is up (i.e. when the timer is 0 and isActive is true). If false, DisplayTime will say 00:00.00",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "isActive",
              description: "Indicates if the timer is active or not.",
              type: "boolean",
              defaultValue: "true",
            },
          ]}
        />

        <DocumentComponent
          title="Input "
          component={<Input />}
          propDocs={[
            {
              prop: "timeChanged",
              description: "Function that is called when the components input is changed.",
              type: "function (number)",
            },
            {
              prop: "placeholder",
              description: "Text to be displayed in input field.",
              type: "string",
            },
          ]}
        />

        <DocumentComponent
          title="Panel "
          component={<Panel />}
          propDocs={[
            {
              prop: "n/a",
              description: "For future styling purpose.",
              type: "",
            },
          ]}
        />

      </div>
      
    </Container>
  );
};

export default Documentation;

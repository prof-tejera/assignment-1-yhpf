import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import Button from "../components/generic/Button";

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
              description: "CSS class of the button",
              type: "string",
            },
            {
              prop: "text",
              description: "Text to display on the button",
              type: "string",
            },
            {
              prop: "onClick",
              description: "Method to run when you click the button",
              type: "function",
            }
          ]}
        />

      </div>
      
    </Container>
  );
};

export default Documentation;

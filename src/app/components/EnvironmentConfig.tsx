import { Flex, Container } from "@dynatrace/strato-components";
import { Typography } from "@dynatrace/strato-design-tokens";
import React from "react";
import styled from "styled-components";

/*
Environment config types:
- standard: threshold, violating samples, window, dealerting samples, dealerting window
- toggle: enabled or disabled
Logic needs to be added for
- Garbage collection
- Memory page faults?
*/


const StyledFlex = styled(Flex)`
  font-family: ${Typography.Heading.Level1.Family};
  font-size: 18px;
`;

export const EnvironmentConfig = ({ format, threshold, violatingSamples, window, dealertingSamples, dealertingWindow, enabled }) => {

//Render based on incoming config format  
  const renderMap = {
    standard: () => (
      <StyledFlex flexDirection="row" alignItems="center">
        <Container color="critical">{threshold}</Container>% for{" "}
        <Container color="success">{violatingSamples}</Container> of{" "}
        <Container color="neutral">{window}</Container> one-minute samples
      </StyledFlex>
    ),
    toggle: () => (
      <StyledFlex flexDirection="row" alignItems="center">
        Alert is{" "}
        <Container color={enabled === "disabled" ? "success" : "critical"}>
          {enabled}
        </Container>
      </StyledFlex>
    ),
  };

  return renderMap[format] ? renderMap[format]() : null;
};

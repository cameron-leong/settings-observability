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

export const EnvironmentConfig = ({ format, thresholds, violatingSamples, window, dealertingSamples, dealertingWindow, enabled }) => {

//Render based on incoming config format  
  const renderMap = {
    "CPU Saturation": () => (
      <StyledFlex flexDirection="row" alignItems="center">
        <Container color="critical">{thresholds.threshold}%</Container> for{" "}
        <Container color="success">{violatingSamples}</Container> of{" "}
        <Container color="neutral">{window}</Container> one-minute samples
      </StyledFlex>
    ),
    "GC Activity": () => (
      <StyledFlex flexDirection="row" alignItems="center">
        <Container color="critical">{thresholds.timeThreshold}%</Container> GC Time
        <Container color="critical">{thresholds.suspensionThreshold}%</Container> suspension
      </StyledFlex>
    ),
    "Memory Detection": () => (
      <StyledFlex flexDirection="row" alignItems="center">
        <Container color="critical">{thresholds.windowsThreshold}%</Container>usage for Windows
        <Container color="critical">{thresholds.unixThreshold}%</Container> usage for Unix
      </StyledFlex>
    ),
  };

  return renderMap[format] ? renderMap[format]() : null;
};

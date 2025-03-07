import Borders from "@dynatrace/strato-design-tokens/borders";
import BoxShadows from "@dynatrace/strato-design-tokens/box-shadows";
import Colors from "@dynatrace/strato-design-tokens/colors";
import { Container, Flex } from "@dynatrace/strato-components/layouts";
import { Link } from "@dynatrace/strato-components/typography";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { Typography } from "@dynatrace/strato-design-tokens";
import styled from "styled-components";

const ProblemId = styled("div")`
  font-family: ${Typography.Heading.Level6.Family};
  font-size: ${Typography.Heading.Level6.Size};
  font-weight: ${Typography.Subtitle.Display.Level1.Weight};
`;

const ProblemName = styled("div")`
  font-family: ${Typography.Heading.Level5.Family};
  font-size: ${Typography.Heading.Level5.Size};
  font-weight: ${Typography.Heading.Level5.Weight};
`;

const ProblemPropKey = styled("div")`
  font-family: ${Typography.Heading.Level5.Family};
  font-size: ${Typography.Heading.Level5.Size};
  font-weight: ${Typography.Subtitle.Display.Level1.Weight};
`;

export const ProblemCard = ({ displayId, name, duration, startTime, category, rootCause, affectedCount }) => {

  return (
    <Container>
    <Flex
      flexDirection="column"
      alignItems="start"
      justifyContent="left"
      gap={8}
    >
      {/* Need to make the keys bold but not the values */}
      <ProblemId> {displayId} </ProblemId>
      <ProblemName>{name}</ProblemName>
      <ProblemPropKey>Duration:</ProblemPropKey> {duration}
      <ProblemPropKey>Started:</ProblemPropKey> {startTime}
      <ProblemPropKey>Category:</ProblemPropKey> {category}
      <ProblemPropKey>Root cause:</ProblemPropKey> {rootCause}
      <ProblemPropKey>Affected:</ProblemPropKey> {affectedCount}
    </Flex> 
    </Container>
  );
};

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

const ProblemProp = styled("div")`
  font-family: ${Typography.Text.Small.Default.Family};
  font-size: ${Typography.Text.Small.Default.Size};
  font-weight: ${Typography.Text.Small.Default.Weight};
`;

const Key = styled("span")`
  font-weight: ${Typography.Text.Small.Emphasized.Weight};
`;
const Value = styled("span")`
  font-weight: ${Typography.Text.Small.Default.Weight};
  color: ${Colors.Text.Neutral.Subdued};
`;

export const ProblemCard = ({ displayId, name, duration, startTime, category, rootCause, affectedCount }) => {

  return (
    <Container>
    <Flex
      flexDirection="column"
      alignItems="start"
      justifyContent="left"
      gap={2}
    >
      <ProblemId> {displayId} </ProblemId>
      <ProblemName>{name}</ProblemName>
      <div>
        <ProblemProp><Key>Duration:</Key><Value> {duration}</Value></ProblemProp>
        <ProblemProp><Key>Started:</Key><Value> {startTime}</Value></ProblemProp>
        <ProblemProp><Key>Category:</Key><Value> {category}</Value></ProblemProp>
        <ProblemProp><Key>Root cause:</Key><Value> {rootCause}</Value></ProblemProp>
        <ProblemProp><Key>Affected:</Key><Value> {affectedCount}</Value></ProblemProp>
    </div>
    </Flex> 
    </Container>
  );
};

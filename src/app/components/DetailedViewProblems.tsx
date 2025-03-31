import React from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { DavisAiSignetIcon } from '@dynatrace/strato-icons';
import { Typography } from '@dynatrace/strato-design-tokens';
import styled from "styled-components";
import { ProblemCard } from './ProblemCard';

const Subheading = styled.div`
  font-family: ${Typography.Heading.Level3.Family};
  font-size: ${Typography.Heading.Level3.Size};
  font-weight: ${Typography.Heading.Level3.Weight};
`;

const Subheading2 = styled.div`
  font-family: ${Typography.Text.Base.Default.Family};
  font-size: ${Typography.Text.Base.Default.Size};
  font-weight: ${Typography.Text.Base.Default.Weight};
`;

export const DetailedViewProblems = ({ problems }) => {
  return (
    <Flex flexDirection="column" gap={6}>
      <Flex flexDirection="row" alignItems="center">
        <DavisAiSignetIcon size="large" />
        <Subheading>Problems</Subheading>
      </Flex>
      <Subheading2>{problems.length} active, 0 closed</Subheading2>
      {problems.length > 0 ? (
        problems.map((problem) => (
          <ProblemCard
            key={problem.problemId}
            displayId={problem.displayId}
            name={problem.title}
            duration="N/A"
            startTime={new Date(problem.startTime).toLocaleString()}
            category={problem.severityLevel}
            rootCause={problem.rootCauseEntity?.name ?? "Unknown"}
            affectedCount={problem.affectedEntities?.length ?? 0}
            overrideStatus="No"
          />
        ))
      ) : (
        <Subheading2>No active problems</Subheading2>
      )}
    </Flex>
  );
};


import React from "react";
import styled from "styled-components";
import { useCurrentTheme } from "@dynatrace/strato-components/core";
import { Flex } from "@dynatrace/strato-components/layouts";
import {
  Heading,
  Paragraph,
  Strong,
} from "@dynatrace/strato-components/typography";
import { Card } from "../components/Card";
import { Typography } from "@dynatrace/strato-design-tokens";

const Subheading = styled.div`
  font-family: ${Typography.Heading.Level5.Family};
  font-size: ${Typography.Heading.Level5.Size};
  font-weight: ${Typography.Heading.Level5.Weight};
`;

export const Home = () => {
  const theme = useCurrentTheme();
  return (
    <Flex flexDirection="column" alignItems="center" padding={32}>
      <img
        src="./assets/Dynatrace_Logo.svg"
        alt="Dynatrace Logo"
        width={150}
        height={150}
        style={{ paddingBottom: 32 }}
      ></img>

      <Heading>Welcome to Settings Observability</Heading>
      <Subheading>Seamlessly track custom configurations across your environment</Subheading>

      <Flex gap={48} paddingTop={64} flexFlow="wrap">
        <Card
          href="/main"
          inAppLink
          imgSrc={
            theme === "light" ? "./assets/anomaly_logo_dark.svg" : "./assets/anomaly_logo_light.svg"
          }
          name="Anomaly Detection"
        />
        <Card
          href="/main"
          inAppLink
          imgSrc={
            theme === "light" ? "./assets/anomaly_logo_dark.svg" : "./assets/anomaly_logo_light.svg"
          }
          name="Operations"
        />
      </Flex>
    </Flex>
  );
};

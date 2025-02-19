import React from "react";

import { useCurrentTheme } from "@dynatrace/strato-components/core";
import { Flex } from "@dynatrace/strato-components/layouts";
import {
  Heading,
  Paragraph,
  Strong,
} from "@dynatrace/strato-components/typography";
import { Card } from "../components/Card";

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

      <Flex gap={48} paddingTop={64} flexFlow="wrap">
        <Card
          href="/anomalydetection"
          inAppLink
          imgSrc={
            theme === "light" ? "./assets/anomaly_logo_dark.svg" : "./assets/anomaly_logo_light.svg"
          }
          name="Anomaly Detection Settings"
        />
        <Card
          href="/operational"
          inAppLink
          imgSrc={
            theme === "light" ? "./assets/operational_logo_dark.svg" : "./assets/operational_logo_light.svg"
          }
          name="Operational Settings"
        />
      </Flex>
    </Flex>
  );
};

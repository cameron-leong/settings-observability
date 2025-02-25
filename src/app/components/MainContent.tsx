import React from 'react';
import { useCurrentTheme } from "@dynatrace/strato-components/core";


import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
import Borders from '@dynatrace/strato-design-tokens/borders';
import Colors from '@dynatrace/strato-design-tokens/colors';
import Spacings from '@dynatrace/strato-design-tokens/spacings';
import { Card } from './Card';
import { DataTable } from './DataTable';
import { LevelToggle } from './LevelToggle';

// const Placeholder = () => (
//   <div
//     style={{
//       width: '100%',
//       height: '100%',
//       marginTop: Spacings.Size24,
//       borderRadius: Borders.Radius.Container.Default,
//       backgroundColor: Colors.Background.Container.Neutral.Default,
//     }}
//   />
// );
const Content = () => (
  <Card
      href="/anomalydetection"
      inAppLink
      imgSrc={
        "./assets/anomaly_logo_dark.svg"
      }
      name="Anomaly Detection Settings"
  />
);

export const MainContent = ({title, subtitle  }) => {
  const theme = useCurrentTheme();
  return (

      <Page.Main style={{ display: 'flex', flexDirection: 'column'}}>
        <TitleBar style={{ marginBottom: '20px' }}>
          <TitleBar.Prefix>
            <Page.PanelControlButton target="sidebar" />
          </TitleBar.Prefix>
          <TitleBar.Title>{title}</TitleBar.Title>
          <TitleBar.Subtitle>
            {subtitle}
          </TitleBar.Subtitle>
          <TitleBar.Action>
            <Page.PanelControlButton />
          </TitleBar.Action>
        </TitleBar>
        <LevelToggle />
        <DataTable />
      </Page.Main>

  );
};
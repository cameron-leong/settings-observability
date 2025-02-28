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

export const MainContent = ({title, subtitle, toggleGroups,isDetailViewVisible, setIsDetailViewVisible }) => {
  const theme = useCurrentTheme();
  console.log("In main content: ", isDetailViewVisible)
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
            <Page.PanelControlButton
              onClick={() => setIsDetailViewVisible(!isDetailViewVisible)}
            />
          </TitleBar.Action>
        </TitleBar>
        <LevelToggle toggleGroups={toggleGroups}/>
        <DataTable />
      </Page.Main>

  );
};
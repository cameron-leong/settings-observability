import React, { useMemo } from 'react';
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
import { randBetweenDate, randDomainName, randFloat, randNumber } from '@ngneat/falso';
import { DataTableV2ColumnDef } from '@dynatrace/strato-components-preview';
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

    //Define the columns that make up the table. The useMemo hook ensures they are only rendered once 
    // const columns = useMemo<DataTableV2ColumnDef<(typeof data)[number]>[]>(() => {
    //   return [
    //     {
    //       id: 'Setting',
    //       header: 'Setting',
    //       accessor: 'setting',
    //     },
    //     {
    //       id: 'Threshold',
    //       header: 'Threshold',
    //       accessor: 'threshold',
    //     },
    //     {
    //       id: 'Sliding window',
    //       header: 'Sliding window',
    //       accessor: 'sliding window',
    //     },
    //     {
    //       id: 'Overrides',
    //       header: 'Overrides',
    //       accessor: 'overrides',
    //     },
    //   ];
    // }, []);
  
    // //Define the data that is to be displayed in the table. The keys must match the column accessors defined above.
    // const data = useMemo(
    //   () =>
    //     new Array(300).fill(0).map(() => ({
    //       setting: `et-demo-${randDomainName()}`,
    //       threshold: randFloat({ min: 100, max: 300, precision: 2 }),
    //       'sliding window': randNumber({ min: 3520000000, max: 6150000000 }),
    //       overrides: randBetweenDate({
    //         from: '2022-09-26T12:45:07Z',
    //         to: '2022-09-28T10:22:56Z',
    //       }),
    //     })),
    //   []
    // );


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
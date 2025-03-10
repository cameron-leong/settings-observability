import React, { useState, useMemo } from 'react';
import { Flex, Surface, Divider, Container } from '@dynatrace/strato-components/layouts';
import styled from "styled-components";
import {
  DataTableV2,
  type DataTableV2ColumnDef,
} from '@dynatrace/strato-components-preview/tables';
import {
  randNumber,
  randDomainName,
  randFloat,
  randBetweenDate,
} from '@ngneat/falso';
import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
import Borders from '@dynatrace/strato-design-tokens/borders';
import Colors from '@dynatrace/strato-design-tokens/colors';
import Spacings from '@dynatrace/strato-design-tokens/spacings';
import { Tab, Tabs } from '@dynatrace/strato-components-preview/navigation';
import { CriticalIcon, DavisAiSignetIcon, OfficeFilledIcon } from '@dynatrace/strato-icons';
import { Typography } from '@dynatrace/strato-design-tokens';
import {
  ToggleButtonGroup,
  ToggleButtonGroupItem,
} from '@dynatrace/strato-components-preview/buttons';
import { ProblemCard } from './ProblemCard';
import { DataTable } from './DataTable';
const Heading = styled("div")`
  font-family: ${Typography.Heading.Level1.Family};
  font-size: ${Typography.Heading.Level1.Size};
  font-weight: ${Typography.Heading.Level1.Weight};
`;

const Subheading = styled("div")`
  font-family: ${Typography.Heading.Level3.Family};
  font-size: ${Typography.Heading.Level3.Size};
  font-weight: ${Typography.Heading.Level3.Weight};
`;
const Subheading2 = styled("div")`
  font-family: ${Typography.Text.Base.Default.Family};
  font-size: ${Typography.Text.Base.Default.Size};
  font-weight: ${Typography.Text.Base.Default.Weight};
  color: ${Colors.Text.Neutral.Subdued}
`;

const icons = [<CriticalIcon style={{verticalAlign: 'middle', padding:4}}/>, <OfficeFilledIcon style={{verticalAlign: 'middle'}}/>]

export const DetailedView = ({
  title, 
  subtitle,
  description,
  isDetailViewVisible, 
  setIsDetailViewVisible
}) => {
  console.log(Subheading)
    //Define the columns that will make up the table
    const overrideColumns = useMemo<DataTableV2ColumnDef<(typeof overrideData)[number]>[]>(() => {
      return [
        {
          id: 'EntityName',
          header: 'Name',
          accessor: 'entityName'
        },
        {
          id: 'Threshold',
          header: 'Threshold',
          accessor: 'threshold'
        },
        {
          id: 'Violating samples',
          header: 'Violating samples', 
          accessor: 'violatingSamples'
        },
        {
          id: 'Sliding window',
          header: 'Sliding window',
          accessor: 'slidingWindow'
        }
      ];
    }, []);
    //Define the data that is to be displayed in the table. The keys must match the column accessors defined above.
    const overrideData = useMemo(
      () => [{
        entityName: "myHostGroup",
        threshold: 90,
        violatingSamples: 3,
        slidingWindow: 5
      },
      {
        entityName: "otherHostGroup",
        threshold: 80,
        violatingSamples: 7,
        slidingWindow: 10
      }
    ],
      []
    );
    const revisionHistoryColumns = useMemo<DataTableV2ColumnDef<(typeof revisionHistoryData)[number]>[]>(() => {
      return [
        {
          id: 'Timestamp',
          header: 'Timestamp',
          accessor: 'timestamp'
        },
        {
          id: 'User',
          header: 'User',
          accessor: 'user'
        },
        {
          id: 'New configuration',
          header: 'New configuration', 
          accessor: 'newConfiguration'
        },
        {
          id: 'Previous configuration',
          header: 'Previous configuration',
          accessor: 'previousConfiguration'
        }
      ];
    }, []);
    //Define the data that is to be displayed in the table. The keys must match the column accessors defined above.
    const revisionHistoryData = useMemo(
      () => [{
        timestamp: "5:23 PM Mar 7, 2025",
        user: "cameron.leong@dynatrace.com",
        newConfiguration: "95% for 3 of 5 minutes",
        previousConfiguration: "90% for 3 of 5 minutes"
      },
      {
        timestamp: "4:12 PM Mar 3, 2025",
        user: "ahmed.samay@dynatrace.com",
        newConfiguration: "90% for 3 of 5 minutes",
        previousConfiguration: "80% for 3 of 5 minutes"
      }
    ],
      []
    );
  
  return (
      <Page.DetailView preferredWidth={1000}
        style={{ display: 'flex', flexDirection: 'column' }}
        dismissed={!isDetailViewVisible}
        onDismissChange={(state) => setIsDetailViewVisible(state)}
      >
        <TitleBar>
          <TitleBar.Title>
            <Heading><CriticalIcon/> {title} </Heading>
          </TitleBar.Title>
          <TitleBar.Subtitle>
            {subtitle}
          </TitleBar.Subtitle>
          <TitleBar.Action>
            <Page.PanelControlButton
              onClick={() => setIsDetailViewVisible(false)}
            />
          </TitleBar.Action>
        </TitleBar>
          <Tabs>
            <Tab title="Overview">
              <Subheading>Description</Subheading>
              <Surface elevation='flat'>
                {description}
              </Surface>
              <Subheading>Global configuration</Subheading>
              <Surface>
                <Flex 
                  flexDirection='row' 
                  alignItems='center'
                  style={{fontSize: '24px'}} //How to use Typography.Heading.Level1.Family instead?
                > 
                  <Container color="critical">95</Container >% for <Container color="success">3</Container> of <Container color="neutral">5</Container> one-minute samples
                </Flex>
              </Surface>
              <Subheading>Overrides</Subheading>
              <Surface>
              <Flex justifyContent="start">
                {/* <ToggleButtonGroup value={rowDensity} onChange={setRowDensity}> */}
                {/* Add functionality to the toggle group */}
                <ToggleButtonGroup>
                  <ToggleButtonGroupItem value="HostGroups">Host Groups</ToggleButtonGroupItem> 
                  <ToggleButtonGroupItem value="Hosts">Hosts</ToggleButtonGroupItem>
                </ToggleButtonGroup>
                </Flex>
                <DataTableV2 
                  columns={overrideColumns} 
                  data={overrideData} 
                  variant={{ verticalDividers: true }} 
                  resizable
                  fullWidth
                />
              </Surface>
            </Tab>
            <Tab title="Problems">
              <Flex flexDirection='column' gap={6}>
                <Flex flexDirection='row' alignItems='center'>
                  <DavisAiSignetIcon size="large"/>
                  <Subheading>Problems</Subheading>
                </Flex>
                <Subheading2>1 active, 0 closed</Subheading2>
                <ProblemCard
                  displayId={"P-25031544"}
                  name={"CPU Saturation"}
                  duration={"32 m"}
                  startTime = {"Mar 7, 2025, 9:23 AM"}
                  category = {"Resource contention"}
                  rootCause={"hostName27"}
                  affectedCount={1}
                  overrideStatus={"No"}
                />
              </Flex>
            </Tab>
            <Tab title="Revision history">
              Recent configuration changes
              <DataTable columns={revisionHistoryColumns} data={revisionHistoryData} />
            </Tab>
          </Tabs>

        </Page.DetailView>
  );
};
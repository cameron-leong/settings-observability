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
import { CriticalIcon, OfficeFilledIcon } from '@dynatrace/strato-icons';
import { Typography } from '@dynatrace/strato-design-tokens';
import {
  ToggleButtonGroup,
  ToggleButtonGroupItem,
} from '@dynatrace/strato-components-preview/buttons';

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
    const columns = useMemo<DataTableV2ColumnDef<(typeof data)[number]>[]>(() => {
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
    const data = useMemo(
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
                <ToggleButtonGroup>
                  <ToggleButtonGroupItem value="HostGroups">Host Groups</ToggleButtonGroupItem>
                  <ToggleButtonGroupItem value="Hosts">Hosts</ToggleButtonGroupItem>
                </ToggleButtonGroup>
                </Flex>
                <DataTableV2 
                  columns={columns} 
                  data={data} 
                  variant={{ verticalDividers: true }} 
                  resizable
                  fullWidth
                />
              </Surface>
            </Tab>
            <Tab title="Problems">
              Recent {title} problems in the environment
            </Tab>
            <Tab title="Revision history">
              Recent configuration changes
            </Tab>
          </Tabs>

        </Page.DetailView>
  );
};
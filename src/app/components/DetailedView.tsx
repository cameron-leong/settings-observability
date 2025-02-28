import React, { useState } from 'react';
import { Flex, Surface, Divider } from '@dynatrace/strato-components/layouts';
import styled from "styled-components";

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

const Placeholder = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      marginTop: Spacings.Size24,
      borderRadius: Borders.Radius.Container.Default,
      backgroundColor: Colors.Background.Container.Neutral.Default,
    }}
  />
);
const Heading = styled("div")`
  font-family: ${Typography.Heading.Level1.Family};
  font-size: ${Typography.Heading.Level1.Size};
  font-weight: ${Typography.Heading.Level1.Weight};
`;



const icons = [<CriticalIcon style={{verticalAlign: 'middle', padding:4}}/>, <OfficeFilledIcon style={{verticalAlign: 'middle'}}/>]


export const DetailedView = ({
  title, 
  subtitle,
  description,
  isDetailViewVisible, 
  setIsDetailViewVisible
}) => {
  console.log(title)
  return (
      <Page.DetailView minWidth={500}
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
        <Surface elevation="flat">
          <Tabs>
            <Tab title="Overview">
              {description}
              Environment-level configuration: 95% for 3 of 5 minutes
            </Tab>
            <Tab title="Problems">
              Recent {title} problems in the environment
            </Tab>
            <Tab title="Revision history">
              Recent configuration changes
            </Tab>
          </Tabs>
        </Surface>

        </Page.DetailView>
  );
};
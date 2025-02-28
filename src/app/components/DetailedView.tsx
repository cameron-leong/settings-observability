import React, { useState } from 'react';

import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
import Borders from '@dynatrace/strato-design-tokens/borders';
import Colors from '@dynatrace/strato-design-tokens/colors';
import Spacings from '@dynatrace/strato-design-tokens/spacings';

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


export const DetailedView = ({title, subtitle, isDetailViewVisible, setIsDetailViewVisible}) => {
  console.log("In det view:", isDetailViewVisible)
  return (
      <Page.DetailView 
        style={{ display: 'flex', flexDirection: 'column' }}
        dismissed={!isDetailViewVisible}
        onDismissChange={(state) => setIsDetailViewVisible(state)}
      >
        <TitleBar>
          <TitleBar.Title>{title}</TitleBar.Title>
          <TitleBar.Subtitle>
            {subtitle}
          </TitleBar.Subtitle>
          <TitleBar.Action>
            <Page.PanelControlButton
              onClick={() => setIsDetailViewVisible(false)}
            />
          </TitleBar.Action>
        </TitleBar>
        {/* <Placeholder /> */}
        Details of the settings
      </Page.DetailView>
  );
};
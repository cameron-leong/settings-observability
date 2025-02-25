import React from 'react';

import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';


export const SideBar = ({title, subtitle}) => {
  return (
      <Page.Sidebar >
        <TitleBar>
          <TitleBar.Title>{title}</TitleBar.Title>
          <TitleBar.Subtitle>{subtitle}</TitleBar.Subtitle>
          <TitleBar.Action>
            <Page.PanelControlButton />
          </TitleBar.Action>
        </TitleBar>
      </Page.Sidebar>
  );
};
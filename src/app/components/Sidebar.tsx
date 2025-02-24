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
          <TitleBar.Title>Sidebar</TitleBar.Title>
          <TitleBar.Subtitle>e.g. for navigation</TitleBar.Subtitle>
          <TitleBar.Action>
            <Page.PanelControlButton />
          </TitleBar.Action>
        </TitleBar>
      </Page.Sidebar>
  );
};
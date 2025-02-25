import React from 'react';
import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
import Borders from '@dynatrace/strato-design-tokens/borders';
import Colors from '@dynatrace/strato-design-tokens/colors';
import Spacings from '@dynatrace/strato-design-tokens/spacings';
import { SideBar } from './Sidebar';
import { MainContent } from './MainContent';
import { DetailedView } from './DetailedView';

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

export const PageWithSidebar = ({appName}) => {
  return (
    <Page>
      <Page.Header>
        <AppHeader>
          <AppHeader.NavItems>
            <AppHeader.AppNavLink appName="MyApp" />
          </AppHeader.NavItems>
        </AppHeader>
      </Page.Header>
      < SideBar title={"Sidebar"} subtitle={"subtitle"}/>
      <MainContent title={"Main content"} subtitle={"subtitle"} />
      < DetailedView title={"Detailed view"} subtitle={"more details"} />
    </Page>
  );
};
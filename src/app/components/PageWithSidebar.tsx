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
import { useState } from 'react';
import { AccordionComponent } from './Accordion';


const sidebarItems = [
    {
      category: "Anomaly detection",
      items: ["Infrastructure", "Services", "Davis Anomaly Detectors"]
    },
    {
      category: "Operational settings",
      items: ["Management zones", "Alerting profiles", "Problem notifications"]
    }
];
export const PageWithSidebar = ({appName}) => {
  return (
    <Page>
      < SideBar title={"Configurations"} subtitle={"Select which configurations to view"}  items={sidebarItems}/>
      < MainContent title={"Configurations"} subtitle={""} />
      < DetailedView title={"Detailed view"} subtitle={"more details"}/>
    </Page>
  );
};
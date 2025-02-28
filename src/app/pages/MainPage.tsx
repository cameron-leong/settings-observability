import React from 'react';
import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
import Borders from '@dynatrace/strato-design-tokens/borders';
import Colors from '@dynatrace/strato-design-tokens/colors';
import Spacings from '@dynatrace/strato-design-tokens/spacings';
import { SideBar } from '../components/Sidebar';
import { MainContent } from '../components/MainContent';
import { DetailedView } from '../components/DetailedView';
import { useState } from 'react';


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

const toggleGroups = [
  {
    label: "Environment",
    position: "left"
  },
  {
    label: "Host group",
    position: "center"
  },
  {
    label: "Individual",
    position: "right"
  }
]

export const MainPage = ({appName}) => {
  //Handle states
  const [isDetailViewVisible, setIsDetailViewVisible] = useState<boolean>(false);
  return (
    <Page>
      < SideBar 
        title={"Configurations"}
        subtitle={"Select which configurations to view"}  
        items={sidebarItems}
      />
      < MainContent 
        title={"Configurations"} 
        subtitle={""} 
        toggleGroups={toggleGroups}
        isDetailViewVisible={isDetailViewVisible} 
        setIsDetailViewVisible={setIsDetailViewVisible} 
      />
      < DetailedView 
        title={"CPU Saturation"} 
        description={"CPU Saturation problems are raised when CPU Usage % goes above the defined threshold for the defined period of time"}
        isDetailViewVisible={isDetailViewVisible} 
        setIsDetailViewVisible={setIsDetailViewVisible}
      />
    </Page>
  );
};
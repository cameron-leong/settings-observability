import React from 'react';
import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
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

export const Main = ({appName}) => {
  //Handle states
  const [isDetailViewVisible, setIsDetailViewVisible] = useState<boolean>(false);
  const [detections, setDetections] = useState<any[]>([]);
  const [selectedSetting, setSelectedSetting] = useState(null);
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
        detections={detections}
        setDetections={setDetections}
        setSelectedSetting={setSelectedSetting}
      />
      < DetailedView
        title={"CPU Saturation"} 
        subtitle={""} 
        description={"CPU Saturation problems are raised when CPU Usage % goes above the defined threshold for the defined period of time"}
        isDetailViewVisible={isDetailViewVisible} 
        setIsDetailViewVisible={setIsDetailViewVisible}
        detections={detections}
        selectedSetting={selectedSetting}
      />
    </Page>
  );
};
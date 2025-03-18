import React, { useEffect, useMemo, useState } from 'react';
import { useCurrentTheme } from "@dynatrace/strato-components/core";
import {
  AppHeader,
  Page,
  TitleBar,
} from '@dynatrace/strato-components-preview/layouts';
import { fetchHostAnomalyDetectionData } from '../fetchData/fetchHostAnomalyDetectionData'; // Import the API function
import { Card } from './Card';
import { DataTable } from './DataTable';
import { LevelToggle } from './LevelToggle';
import {
  DataTableV2,
  type DataTableV2ColumnDef,
} from '@dynatrace/strato-components-preview/tables';
import styled from "styled-components";
import { Colors } from '@dynatrace/strato-design-tokens';

const GreyTableEntry = styled("span")`
  color: ${Colors.Text.Neutral.Subdued};
`;

export const MainContent = ({ title, subtitle, toggleGroups, isDetailViewVisible, setIsDetailViewVisible }) => {
  const [detections, setDetections] = useState<any[]>([]);  // Store multiple detection configurations

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHostAnomalyDetectionData();
        const detectionsData = [
          { 
            settingId: "CPU Saturation",
            enabled: (response?.items?.[0]?.value?.host?.highCpuSaturationDetection?.enabled)? "enabled":"disabled",
            detectionMode: response?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode,
            threshold: response?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode == "auto"? "90%": response?.items?.[0]?.value?.host?.highCpuSaturationDetection?.customThresholds?.cpuSaturation
          },
          {
            settingId: "GC Activity",
            enabled: (response?.items?.[0]?.value?.host?.highGcActivityDetection?.enabled)? "enabled":"disabled",
            detectionMode: response?.items?.[0]?.value?.host?.highGcActivityDetection?.detectionMode,
            threshold: response?.items?.[0]?.value?.host?.highGcActivityDetection?.detectionMode == "auto"? "40% GC time, 25% GC suspension": `${response?.items?.[0]?.value?.host?.highGcActivityDetection?.customThresholds?.gcTimePercentage}% GC time, ${response?.items?.[0]?.value?.host?.highGcActivityDetection?.customThresholds?.gcSuspensionPercentage}% GC suspension`
          },
          {
            settingId: "Memory Detection",
            enabled: (response?.items?.[0]?.value?.host?.highMemoryDetection?.enabled)? "enabled":"disabled",
            detectionMode: response?.items?.[0]?.value?.host?.highMemoryDetection?.detectionMode,
            threshold: response?.items?.[0]?.value?.host?.highMemoryDetection?.detectionMode == "auto"? "90% Windows, 80% Unix": `${response?.items?.[0]?.value?.host?.highMemoryDetection?.customThresholds?.usedMemoryPercentageWindows}% Windows, ${response?.items?.[0]?.value?.host?.highMemoryDetection?.customThresholds?.usedMemoryPercentageNonWindows}% Unix`
          }
        ];
        
        setDetections(detectionsData);  // Store all detections in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define table columns
  const columns = useMemo<DataTableV2ColumnDef<(typeof detections)[number]>[]>(() => [
    { id: 'setting', header: 'Setting', accessor: 'settingId' },
    { id: 'detectionMode', header: 'Detection Mode', accessor: 'detectionMode' },
    { id: 'enabled', header: 'Enabled', accessor: 'enabled' },
    { id: 'threshold', header: 'Threshold', accessor: 'threshold' }
  ].map(column => ({
    ...column,
    cell: ({ value, rowData }) => (
      <DataTableV2.DefaultCell>
        {rowData.enabled=="enabled" ? (
          value
        ) : (
          <GreyTableEntry>{String(value)}</GreyTableEntry>
        )}
      </DataTableV2.DefaultCell>
    )
  })), []);
  

  const theme = useCurrentTheme();

  return (
    <Page.Main style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleBar style={{ marginBottom: '20px' }}>
        <TitleBar.Prefix>
          <Page.PanelControlButton target="sidebar" />
        </TitleBar.Prefix>
        <TitleBar.Title>{title}</TitleBar.Title>
        <TitleBar.Subtitle>{subtitle}</TitleBar.Subtitle>
        <TitleBar.Action>
          <Page.PanelControlButton onClick={() => setIsDetailViewVisible(!isDetailViewVisible)} />
        </TitleBar.Action>
      </TitleBar>
      <LevelToggle toggleGroups={toggleGroups} />
        <DataTable columns={columns} data={detections} /> 
    </Page.Main>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import { Detection, HostAnomalyDetectionResponse } from 'src/types/anomalyDetectionTypes';
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

export const MainContent = ({ title, subtitle, toggleGroups, isDetailViewVisible, setIsDetailViewVisible }) => {
  const [detections, setDetections] = useState<any[]>([]);  // Store multiple detection configurations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHostAnomalyDetectionData();
        const detectionsData = [
          { 
            settingId: "CPU Saturation",
            enabled: response?.items?.[0]?.value?.host?.highCpuSaturationDetection?.enabled,
            detectionMode: response?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode,
          },
          {
            settingId: "GC Activity",
            enabled: response?.items?.[0]?.value?.host?.highGcActivityDetection?.enabled,
            detectionMode: response?.items?.[0]?.value?.host?.highGcActivityDetection?.detectionMode,
          },
          {
            settingId: "Memory Detection",
            enabled: response?.items?.[0]?.value?.host?.highMemoryDetection?.enabled,
            detectionMode: response?.items?.[0]?.value?.host?.highMemoryDetection?.detectionMode,
          },
          {
            settingId: "System Load",
            enabled: response?.items?.[0]?.value?.host?.highSystemLoadDetection?.enabled,
            detectionMode: response?.items?.[0]?.value?.host?.highSystemLoadDetection?.detectionMode,
          }
        ];
        
        setDetections(detectionsData);  // Store all detections in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  // Define table columns
  const columns = useMemo<DataTableV2ColumnDef<(typeof detections)[number]>[]>(() => [
    { id: 'setting', header: 'Setting', accessor: 'settingId' },
    { id: 'detectionMode', header: 'Detection Mode', accessor: 'detectionMode' },
    { id: 'enabled', header: 'Enabled', accessor: 'enabled' }
  ], []);

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

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>Error: {error}</div>
      ) : (
        <DataTable columns={columns} data={detections} /> 
      )}
    </Page.Main>
  );
};

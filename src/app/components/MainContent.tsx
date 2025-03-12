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
  const [cpuConfig, setCpuConfig] = useState<any>();  // Store fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetchHostAnomalyDetectionData();
        const cpuSaturationResponse = response?.items?.[0]?.value?.host?.highCpuSaturationDetection;      
        const cpuSaturationInfo = {
          settingId: "CPU Saturation",
          enabled: cpuSaturationResponse?.enabled,
          threshold: cpuSaturationResponse?.detectionMode,
        };
        setCpuConfig(cpuSaturationInfo); // Store the relevant data in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Define table columns
  const columns = useMemo<DataTableV2ColumnDef<(typeof cpuConfig)>[]>(() => [
    { id: 'setting', header: 'Setting', accessor: 'settingId' }, // Adjust based on actual API data keys
    { id: 'threshold', header: 'Threshold', accessor: 'threshold' },
    { id: 'enabled', header: 'Enabled', accessor: 'enabled' },
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
        <DataTable columns={columns} data={[cpuConfig]} />
      )} 
    </Page.Main>
  );
};

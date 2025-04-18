import React, { useEffect, useMemo, useState } from 'react';
import {  type DataTableV2ColumnDef } from '@dynatrace/strato-components-preview/tables';
import { Tab, Tabs } from '@dynatrace/strato-components-preview/navigation';
import { CriticalIcon, DavisAiSignetIcon } from '@dynatrace/strato-icons';
import Colors from '@dynatrace/strato-design-tokens/colors';
import { Typography } from '@dynatrace/strato-design-tokens';
import styled from "styled-components";
import { Page, TitleBar } from '@dynatrace/strato-components-preview';
import { getHostCpuProblems } from '../../../api/get-cpu-problems';
import { Problem } from 'src/types/problemResponse';
import { DetailedViewOverview } from './DetailedViewOverview';
import { DetailedViewProblems } from './DetailedViewProblems';
import { DetailedViewRevisionHistory } from './DetailedViewRevisionHistory';

// Styled Components
const Heading = styled.div`
  font-family: ${Typography.Heading.Level1.Family};
  font-size: ${Typography.Heading.Level1.Size};
  font-weight: ${Typography.Heading.Level1.Weight};
`;

const Subheading = styled.div`
  font-family: ${Typography.Heading.Level3.Family};
  font-size: ${Typography.Heading.Level3.Size};
  font-weight: ${Typography.Heading.Level3.Weight};
`;

const Subheading2 = styled.div`
  font-family: ${Typography.Text.Base.Default.Family};
  font-size: ${Typography.Text.Base.Default.Size};
  font-weight: ${Typography.Text.Base.Default.Weight};
  color: ${Colors.Text.Neutral.Subdued};
`;

// Component
export const DetailedView = ({
  title = "Default Title",
  subtitle = "Default Subtitle",
  description = "No description available",
  isDetailViewVisible,
  setIsDetailViewVisible,
  detections,
  selectedSetting
}) => {
  
  const [problems, setProblems] = useState<Problem[]>([]);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getHostCpuProblems();
        console.log("PROBLEMS: ", response?.problems)
        setProblems(response?.problems ?? []); // Ensure it's always an array
      } catch (error) {
        console.error("Something is wrong", error);
        setProblems([]); // Ensure an empty array on error
      }
    };
  
    fetchProblems();
  }, []);
  
  // Table Data (Example data - will change dynamically in the future)
  const overrideData = useMemo(() => [
    { entityName: "myHostGroup", threshold: 90, violatingSamples: 3, slidingWindow: 5 },
    { entityName: "otherHostGroup", threshold: 80, violatingSamples: 7, slidingWindow: 10 }
  ], []);

  const revisionHistoryData = useMemo(() => [
    { timestamp: "5:23 PM Mar 7, 2025", user: "cameron.leong@dynatrace.com", newConfiguration: "95% for 3 of 5 minutes", previousConfiguration: "90% for 3 of 5 minutes" },
    { timestamp: "4:12 PM Mar 3, 2025", user: "ahmed.samay@dynatrace.com", newConfiguration: "90% for 3 of 5 minutes", previousConfiguration: "80% for 3 of 5 minutes" }
  ], []);

  // Table Column Definitions
  const overrideColumns = useMemo<DataTableV2ColumnDef<typeof overrideData[number]>[]>(() => [
    { id: 'EntityName', header: 'Name', accessor: 'entityName' },
    { id: 'Threshold', header: 'Threshold', accessor: 'threshold' },
    { id: 'Violating samples', header: 'Violating samples', accessor: 'violatingSamples' },
    { id: 'Sliding window', header: 'Sliding window', accessor: 'slidingWindow' }
  ], []);

  const revisionHistoryColumns = useMemo<DataTableV2ColumnDef<typeof revisionHistoryData[number]>[]>(() => [
    { id: 'Timestamp', header: 'Timestamp', accessor: 'timestamp' },
    { id: 'User', header: 'User', accessor: 'user' },
    { id: 'New configuration', header: 'New configuration', accessor: 'newConfiguration' },
    { id: 'Previous configuration', header: 'Previous configuration', accessor: 'previousConfiguration' }
  ], []);
  console.log("THRESHOLD:",detections)
  console.log("IN DV:", selectedSetting)
  return (
    <Page.DetailView
      preferredWidth={1000}
      style={{ display: 'flex', flexDirection: 'column' }}
      dismissed={!isDetailViewVisible}
      onDismissChange={setIsDetailViewVisible}
    >
      {/* Title Bar */}
      <TitleBar>
        <TitleBar.Title>
          {selectedSetting && (<Heading><CriticalIcon /> {selectedSetting.settingId} </Heading>)}
        </TitleBar.Title>
        <TitleBar.Subtitle>{subtitle}</TitleBar.Subtitle>
        <TitleBar.Action>
          <Page.PanelControlButton onClick={() => setIsDetailViewVisible(false)} />
        </TitleBar.Action>
      </TitleBar>

      {/* Tabs Section */}
      <Tabs>
        <Tab title="Overview">
          <DetailedViewOverview 
            description={`Details about ${selectedSetting?.settingId}`}
            isDetailViewVisible={isDetailViewVisible}
            setIsDetailViewVisible={setIsDetailViewVisible}
            detections={detections}
            selectedSetting={selectedSetting}
          />
        </Tab>

        {/* Problems Tab */}
        <Tab title="Problems">
          <DetailedViewProblems
            problems={problems}
          />
        </Tab>

        {/* Revision History Tab */}
        <Tab title="Revision history">
          <DetailedViewRevisionHistory/>
        </Tab>
      </Tabs>
    </Page.DetailView>
  );
};

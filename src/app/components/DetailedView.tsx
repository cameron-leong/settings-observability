import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Surface } from '@dynatrace/strato-components/layouts';
import { DataTableV2, type DataTableV2ColumnDef } from '@dynatrace/strato-components-preview/tables';
import { Tab, Tabs } from '@dynatrace/strato-components-preview/navigation';
import { CriticalIcon, DavisAiSignetIcon } from '@dynatrace/strato-icons';
import { ToggleButtonGroup, ToggleButtonGroupItem } from '@dynatrace/strato-components-preview/buttons';
import Colors from '@dynatrace/strato-design-tokens/colors';
import { Typography } from '@dynatrace/strato-design-tokens';
import styled from "styled-components";
import { ProblemCard } from './ProblemCard';
import { DataTable } from './DataTable';
import { EnvironmentConfig } from './EnvironmentConfig';
import { Page, TitleBar } from '@dynatrace/strato-components-preview';
import { fetchHostAnomalyDetectionData } from '../fetchData/fetchHostAnomalyDetectionData';
import { fetchHostCpuProblems } from '../fetchData/fetchHostCpuProblems';
import { Problem } from 'src/types/problemResponse';

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

}) => {
  
  const [problems, setProblems] = useState<Problem[]>([]);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetchHostCpuProblems();
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
  console.log("THRESHOLD:",detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode == "auto"? "90%": detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.customThresholds?.cpuSaturation)
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
          <Heading><CriticalIcon /> {title}</Heading>
        </TitleBar.Title>
        <TitleBar.Subtitle>{subtitle}</TitleBar.Subtitle>
        <TitleBar.Action>
          <Page.PanelControlButton onClick={() => setIsDetailViewVisible(false)} />
        </TitleBar.Action>
      </TitleBar>

      {/* Tabs Section */}
      <Tabs>
        {/* Overview Tab */}
        <Tab title="Overview">
          <Subheading>Description</Subheading>
          <Surface elevation='flat'>{description}</Surface>

          <Subheading>Environment-wide configuration</Subheading>
          <Surface>
            <Flex flexDirection='row' alignItems='center'>
              <EnvironmentConfig
                format="standard"
                threshold={detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode == "auto"? "90%": detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.customThresholds?.cpuSaturation}
                violatingSamples={detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode == "auto"? 3: detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.customThresholds?.eventThresholds?.violatingSamples}
                window={detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode == "auto"? 5: detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.customThresholds?.eventThresholds?.violatingEvaluationWindow}
                dealertingSamples={detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode == "auto"? 5: detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.customThresholds?.eventThresholds?.dealertingSamples}
                dealertingWindow={detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.detectionMode == "auto"? 5: detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.customThresholds?.eventThresholds?.dealertingEvaluationWindow}
                enabled={detections?.items?.[0]?.value?.host?.highCpuSaturationDetection?.enabled ? "enabled" : "disabled"}
              />
            </Flex>
          </Surface>

          <Subheading>Overrides</Subheading>
          <Surface>
            <Flex justifyContent="start">
              <ToggleButtonGroup defaultValue="HostGroups">
                <ToggleButtonGroupItem value="HostGroups">Host Groups</ToggleButtonGroupItem>
                <ToggleButtonGroupItem value="Hosts">Hosts</ToggleButtonGroupItem>
              </ToggleButtonGroup>
            </Flex>
            <DataTableV2 columns={overrideColumns} data={overrideData} variant={{ verticalDividers: true }} resizable fullWidth />
          </Surface>
        </Tab>

        {/* Problems Tab */}
        <Tab title="Problems">
          <Flex flexDirection="column" gap={6}>
            <Flex flexDirection="row" alignItems="center">
              <DavisAiSignetIcon size="large" />
              <Subheading>Problems</Subheading>
            </Flex>
            
            <Subheading2>{problems.length} active, 0 closed</Subheading2>

            {problems.length > 0 ? (
              problems.map((problem) => (
                <ProblemCard
                  key={problem.problemId} // Ensure each ProblemCard has a unique key
                  displayId={problem.displayId}
                  name={problem.title}
                  duration="N/A" // Replace with actual duration logic if available
                  startTime={new Date(problem.startTime).toLocaleString()}
                  category={problem.severityLevel}
                  rootCause={problem.rootCauseEntity?.name ?? "Unknown"}
                  affectedCount={problem.affectedEntities?.length ?? 0}
                  overrideStatus="No" // Adjust based on your logic
                />
              ))
            ) : (
              <Subheading2>No active problems</Subheading2>
            )}
          </Flex>
        </Tab>

        {/* Revision History Tab */}
        <Tab title="Revision history">
          <Subheading>Recent configuration changes</Subheading>
          <DataTable columns={revisionHistoryColumns} data={revisionHistoryData} />
        </Tab>
      </Tabs>
    </Page.DetailView>
  );
};

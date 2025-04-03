import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Surface } from '@dynatrace/strato-components/layouts';
import { DataTableV2, type DataTableV2ColumnDef } from '@dynatrace/strato-components-preview/tables';
import { ToggleButtonGroup, ToggleButtonGroupItem } from '@dynatrace/strato-components-preview/buttons';
import Colors from '@dynatrace/strato-design-tokens/colors';
import { Typography } from '@dynatrace/strato-design-tokens';
import styled from "styled-components";
import { EnvironmentConfig } from './EnvironmentConfig';

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
export const DetailedViewOverview = ({
  description,
  isDetailViewVisible,
  setIsDetailViewVisible,
  detections,
  selectedSetting
}) => {
  console.log("DETECTIONS:\n", detections);
  console.log("SELECTED SETTING:\n", selectedSetting);

  // Find the detection matching the selectedSetting
  const selectedDetection = useMemo(
    () => detections.find(detection => detection.settingId === selectedSetting.settingId),
    [detections, selectedSetting]
  );

  // Table Data (Example data - will change dynamically in the future)
  const overrideData = useMemo(() => [
    { entityName: "myHostGroup", threshold: 90, violatingSamples: 3, slidingWindow: 5 },
    { entityName: "otherHostGroup", threshold: 80, violatingSamples: 7, slidingWindow: 10 }
  ], []);

  // Table Column Definitions
  const overrideColumns = useMemo<DataTableV2ColumnDef<typeof overrideData[number]>[]>(() => [
    { id: 'EntityName', header: 'Name', accessor: 'entityName' },
    { id: 'Threshold', header: 'Threshold', accessor: 'threshold' },
    { id: 'Violating samples', header: 'Violating samples', accessor: 'violatingSamples' },
    { id: 'Sliding window', header: 'Sliding window', accessor: 'slidingWindow' }
  ], []);

  return (
    <div>
      <Subheading>Description</Subheading>
      <Surface elevation='flat'>{description}</Surface>

      <Subheading>Global configuration</Subheading>
      <Surface>
        <Flex flexDirection='row' alignItems='center'>
          {selectedDetection ? (
            <EnvironmentConfig
              format="standard"
              threshold={selectedDetection.threshold}
              violatingSamples={selectedDetection.violatingSamples}
              window={selectedDetection.window}
              dealertingSamples={selectedDetection.dealertingSamples}
              dealertingWindow={selectedDetection.dealertingWindow}
              enabled={selectedDetection.enabled}
            />
          ) : (
            <div>No detection found for the selected setting.</div>
          )}
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
    </div>
  );
};

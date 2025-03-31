import React, { useMemo } from 'react';
import { DataTable } from './DataTable';
import { Typography } from '@dynatrace/strato-design-tokens';
import styled from "styled-components";
import { DataTableV2ColumnDef } from '@dynatrace/strato-components-preview/tables';

const Subheading = styled.div`
  font-family: ${Typography.Heading.Level3.Family};
  font-size: ${Typography.Heading.Level3.Size};
  font-weight: ${Typography.Heading.Level3.Weight};
`;

export const DetailedViewRevisionHistory = () => {
  const revisionHistoryData = useMemo(() => [
    { timestamp: "5:23 PM Mar 7, 2025", user: "cameron.leong@dynatrace.com", newConfiguration: "95% for 3 of 5 minutes", previousConfiguration: "90% for 3 of 5 minutes" },
    { timestamp: "4:12 PM Mar 3, 2025", user: "ahmed.samay@dynatrace.com", newConfiguration: "90% for 3 of 5 minutes", previousConfiguration: "80% for 3 of 5 minutes" }
  ], []);

  const revisionHistoryColumns = useMemo<DataTableV2ColumnDef<typeof revisionHistoryData[number]>[]>(() => [
    { id: 'Timestamp', header: 'Timestamp', accessor: 'timestamp' },
    { id: 'User', header: 'User', accessor: 'user' },
    { id: 'New configuration', header: 'New configuration', accessor: 'newConfiguration' },
    { id: 'Previous configuration', header: 'Previous configuration', accessor: 'previousConfiguration' }
  ], []);

  return (
    <div>
      <Subheading>Recent configuration changes</Subheading>
      <DataTable columns={revisionHistoryColumns} data={revisionHistoryData} />
    </div>
  );
};

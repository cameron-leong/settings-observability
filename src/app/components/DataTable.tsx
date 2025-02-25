import {
    randNumber,
    randDomainName,
    randFloat,
    randBetweenDate,
  } from '@ngneat/falso';
  import React, { useMemo } from 'react';
  
  import {
    DataTableV2,
    type DataTableV2ColumnDef,
  } from '@dynatrace/strato-components-preview/tables';
  


  export const DataTable = () => { 
    //Define the columns that make up the table. The useMemo hook ensures they are only rendered once 
    const columns = useMemo<DataTableV2ColumnDef<(typeof data)[number]>[]>(() => {
      return [
        {
          id: 'Setting',
          header: 'Setting',
          accessor: 'setting',
        },
        {
          id: 'Threshold',
          header: 'Threshold',
          accessor: 'threshold',
        },
        {
          id: 'Sliding window',
          header: 'Sliding window',
          accessor: 'sliding window',
        },
        {
          id: 'Overrides',
          header: 'Overrides',
          accessor: 'overrides',
        },
      ];
    }, []);
  
    //Define the data that is to be displayed in the table. The keys must match the column accessors defined above.
    const data = useMemo(
      () =>
        new Array(300).fill(0).map(() => ({
          setting: `et-demo-${randDomainName()}`,
          threshold: randFloat({ min: 100, max: 300, precision: 2 }),
          'sliding window': randNumber({ min: 3520000000, max: 6150000000 }),
          overrides: randBetweenDate({
            from: '2022-09-26T12:45:07Z',
            to: '2022-09-28T10:22:56Z',
          }),
        })),
      []
    );

    return (
      <DataTableV2 
        columns={columns} 
        data={data} 
        variant={{ verticalDividers: true }} 
        resizable
        fullWidth
      >
        <DataTableV2.Pagination defaultPageSize={10} defaultPageIndex={1} />
      </DataTableV2>
    );
  };
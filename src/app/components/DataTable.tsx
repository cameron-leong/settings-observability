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
  


  export const DataTable = ({columns, data}) => { 
    return (
      <DataTableV2 
        columns={columns} 
        data={data} 
        variant={{ verticalDividers: true }} 
        resizable
        fullWidth
      >
        <DataTableV2.Pagination defaultPageSize={10} />
      </DataTableV2>
    );
  };
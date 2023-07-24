import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { unparse } from 'papaparse';
import { getQueryData } from '../services/api';
import { downloadFileViaBlob } from '../utils/helper';

const size = 50;
function useGetQueryData() {
  const [page, setPage] = useState(1);
  const [exportLoading, setExportLoading] = useState(false);
  const {
    data: rows = [],
    ...queryResult
  } = useQuery(
    ['data'],
    getQueryData,
    {
      enabled: false,
    },
  );

  const data = useMemo(
    () => rows?.slice((page - 1) * size, page * size),
    [rows, page],
  );
  const hasPrevPage = page > 1;
  const hasNextPage = useMemo(
    () => page * size < rows.length,
    [page, rows.length],
  );

  const prevPage = () => hasPrevPage && setPage((page) => page - 1);
  const nextPage = () => hasNextPage && setPage((page) => page + 1);

  const exportData = async () => {
    setExportLoading(true);
    try {
      const csvString = unparse(rows);
      const fileBlob = new Blob([csvString], { type: 'text/csv' });
      const fileName = 'exported_csv';
      downloadFileViaBlob(fileBlob, fileName, 'csv');
      alert('CSV Exported Successfully');
    } catch (e) {
      alert('Error In Exporting CSV');
    }

    setExportLoading(false);
  };

  return {
    data,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    exportData,
    exportLoading,
    ...queryResult,
  };
}

export default useGetQueryData;

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getQueryData } from '../services/api';

const size = 50;
function useGetQueryData() {
  const [page, setPage] = useState(1);
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

  return {
    data,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    ...queryResult,
  };
}

export default useGetQueryData;

import React, {
  useMemo,
  useState,
} from 'react';
import Button from '@mui/material/Button';
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TextArea from '@mui/material/TextareaAutosize';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import useHistories from '../hooks/useHistories';
import useGetQueryData from '../hooks/useGetQueryData';
import { getColumns } from '../utils/helper';

function Dashboard() {
  const {
    histories = [],
    addHistory,
    deleteHistory,
    starredHistory,
    clearAllHistories,
  } = useHistories();
  const [sqlQuery, setSqlQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const {
    data = [],
    isFetching,
    isFetched,
    refetch: getData,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    exportData,
    exportLoading,
  } = useGetQueryData();

  const columns = useMemo(() => getColumns(data[0] ?? {}), [data]);

  const handleQueryChange = (e) => {
    setSqlQuery(e.target.value ?? '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addHistory(sqlQuery);
    await getData();
  };

  const onHistoryClick = (query) => {
    setSqlQuery(query);
  };

  return (
    <div className="h-full w-full flex">
      <div
        className="flex-1 bg-gray-100 flex flex-col space-y-8 items-center h-full p-4 overflow-x-hidden"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full flex space-x-4 items-center justify-center"
        >
          <TextArea
            className="bg-white border border-gray-200 rounded w-2/5 p-2.5 focus:outline-none drop-shadow-xl resize-none"
            id="query-input"
            value={sqlQuery}
            onChange={handleQueryChange}
            placeholder="Enter your SQL query here..."
          />
          <Button
            type="submit"
            variant="contained"
            className="!text-sm !text-white !capitalize !px-6 !py-3 !drop-shadow-xl"
            disabled={!sqlQuery?.trim().length > 0}
          >
            Search
          </Button>
          {!!data.length && (
            <Tooltip
              title="Downlaod CSV"
              placement="right"
              arrow
            >
              <Button
                variant="contained"
                className="!min-w-0 !text-sm !text-white !rounded !flex !items-center !justify-center !py-3"
                onClick={exportData}
                disabled={exportLoading}
              >
                <FileDownloadIcon fontSize="small" />
              </Button>
            </Tooltip>
          )}
        </form>
        {isFetching && (
          <CircularProgress
            color="primary"
            size={40}
          />
        )}
        {!isFetching && data.length > 0 && (
          <Table
            data={data}
            columns={columns}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            onPrevPageClick={prevPage}
            onNextPageClick={nextPage}
          />
        )}
        {isFetched && !data.length && !!sqlQuery && (
          <span>No data found</span>
        )}
      </div>
      {!showHistory && (
        <Tooltip
          title="View Previous Queries"
          placement="left"
          arrow
        >
          <Button
            variant="contained"
            className="!min-w-0 !h-10 !w-10 !text-white !absolute !rounded !top-5 !right-2 !flex !items-center !justify-center !p-0"
            onClick={() => setShowHistory(true)}
          >
            <ViewSidebarRoundedIcon />
          </Button>
        </Tooltip>
      )}
      <Sidebar
        histories={histories}
        isExpanded={showHistory}
        onHistoryClick={onHistoryClick}
        onClose={() => setShowHistory(false)}
        onDeleteHistory={deleteHistory}
        onStarredClick={starredHistory}
        onClearAllClick={clearAllHistories}
      />
    </div>
  );
}

export default Dashboard;

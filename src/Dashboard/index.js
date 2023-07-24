import React, {
  useMemo,
  useState,
} from 'react';
import Button from '@mui/material/Button';
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import TextArea from '@mui/material/TextareaAutosize';
import Tooltip from '@mui/material/Tooltip';
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
  } = useHistories();
  const [sqlQuery, setSqlQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const {
    data = [],
    loading,
    refetch: getData,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
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
          className="w-full flex space-x-2 items-center justify-center"
        >
          <TextArea
            className="bg-white border border-gray-200 rounded w-2/5 p-3 focus:outline-none drop-shadow-2xl resize-none"
            id="query-input"
            value={sqlQuery}
            onChange={handleQueryChange}
            placeholder="Enter your SQL query here..."
          />
          <Button
            type="submit"
            variant="contained"
            className="!text-sm !text-white !capitalize !px-6 !py-3 !drop-shadow-2xl"
            disabled={!sqlQuery?.trim().length > 0}
          >
            Search
          </Button>
        </form>
        {loading && <span>Loading...</span>}
        {!loading && data.length > 0 && (
          <Table
            data={data}
            columns={columns}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            onPrevPageClick={prevPage}
            onNextPageClick={nextPage}
          />
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
      />
    </div>
  );
}

export default Dashboard;

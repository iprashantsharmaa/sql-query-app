import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Tooltip from '@mui/material/Tooltip';
import SearchBar from '../SearchBar';
import { searchItem } from '../../utils/helper';

const buttonClasses = '!flex !justify-start !flex-1 !capitalize !p-2 !rounded-md !text-black-700 hover:!bg-gray-100';

function Sidebar({
  isExpanded,
  onClose,
  histories = [],
  onHistoryClick,
  onDeleteHistory,
  onStarredClick,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const sideBarClasses = clsx(
    'flex flex-col space-y-1 h-full py-1 !bg-white w-0 transition-width duration-100 ease-in overflow-y-scroll',
    { '!w-1/6': isExpanded },
  );

  const filteredHistories = useMemo(
    () => (searchQuery.length > 0 ? searchItem(histories, searchQuery) : histories),
    [searchQuery, histories],
  );

  return (
    <div className={sideBarClasses}>
      <div className="w-full flex items-center space-x-12">
        <Button
          variant="text"
          className="!text-black !min-w-0 w-4 !mx-3"
          onClick={onClose}
        >
          <ArrowForwardIcon fontSize="small" />
        </Button>
        <p className="font-semibold text-black text-right">
          Previous Queries
        </p>
      </div>
      <div className="flex-1 px-3 py-2">
        <SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />
        {!histories?.length && (
        <span className="text-black text-sm">
          No Previous Queries yet
        </span>
        )}
        <div className="flex flex-col justify-start space-y-1">
          {filteredHistories?.length > 0 && filteredHistories.map((history) => (
            <div
              key={history.id}
              className="flex items-center"
            >
              <Button
                key={history.id}
                variant="text"
                className={buttonClasses}
                onClick={() => onHistoryClick(history.query)}
              >
                <div className="flex space-x-2 !truncate">
                  <QueryBuilderIcon fontSize="small" className="!text-black" />
                  <span className="text-sm text-black">{history.query}</span>
                </div>
              </Button>
              <div className="flex items-center">
                <Tooltip
                  title={history.starred ? 'Remove Bookmark' : 'Bookmark Query'}
                  placement="top"
                  arrow
                >
                  <Button
                    variant="text"
                    className="!p-1 !w-[2rem] !min-w-0 !text-black"
                    onClick={() => onStarredClick(history.id)}
                  >
                    {!!history.starred && <StarRateRoundedIcon className="text-blue-600" />}
                    {!history.starred && <StarBorderRoundedIcon />}
                  </Button>
                </Tooltip>
                <Tooltip
                  title="Delete History"
                  placement="top"
                  arrow
                >
                  <Button
                    variant="text"
                    className="!p-1 !w-[2rem] !min-w-0 !text-black"
                    onClick={() => onDeleteHistory(history.id)}
                  >
                    <DeleteOutlineRoundedIcon />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

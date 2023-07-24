import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Pagination({
  hasNextPage,
  hasPrevPage,
  onPrevPage,
  onNextPage,
}) {
  return (
    <div className="flex w-full items-center justify-center space-x-10 !mt-2">
      <Button
        variant="contained"
        className="!min-w-0 !text-white"
        onClick={onPrevPage}
        disabled={!hasPrevPage}
      >
        <ArrowBackIcon />
      </Button>
      <Button
        variant="contained"
        className="!min-w-0 !text-white"
        onClick={onNextPage}
        disabled={!hasNextPage}
      >
        <ArrowForwardIcon />
      </Button>
    </div>
  );
}

export default Pagination;

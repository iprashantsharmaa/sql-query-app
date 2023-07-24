import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Pagination({
  onPrevPage,
  onNextPage,
}) {
  return (
    <div className="flex w-full items-center justify-center space-x-10 !mt-2">
      <Button
        variant="contained"
        className="!min-w-0 !text-white !bg-blue-600"
        onClick={onPrevPage}
      >
        <ArrowBackIcon />
      </Button>
      <Button
        variant="contained"
        className="!min-w-0 !text-white !bg-blue-600"
        onClick={onNextPage}
      >
        <ArrowForwardIcon />
      </Button>
    </div>
  );
}

export default Pagination;

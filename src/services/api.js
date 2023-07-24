import React from 'react';

export const getQueryData = async () => (
  fetch(`/data/data${Math.floor(Math.random() * 4) + 1}.json`)
    .then((res) => res.json())
);

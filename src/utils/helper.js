export const uuid = () => Math.floor(Math.random() * 100);
export const isNil = (val) => val === null || val === undefined;

export const compareFn = (a, b) => {
  if (a === b) return 0;
  if (a) return -1;
  return 1;
};

export const searchItem = (arr, searchQuery) => (
  arr.filter((item) => item?.query.toLowerCase().includes(searchQuery.toLowerCase()))
);

export const getColumns = (dataObj) => (
  Object.keys(dataObj).reduce((columns, key) => (
    [
      ...columns,
      {
        id: key,
        accessorKey: key,
      },
    ]
  ), [])
);

export const downloadFileViaBlob = (
  fileBlob,
  fileName,
  type,
) => {
  if (fileBlob) {
    const dataUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.download = `${fileName}.${type}`;
    link.href = dataUrl;
    link.click();
  }
};

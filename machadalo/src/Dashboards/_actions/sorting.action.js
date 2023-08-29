const sortingTableData = (tableData, accessKey, reverse) => {
  let newList = [];
  newList = tableData.sort((a, b) => {
    let fa = a[accessKey]?.toLowerCase(),
      fb = b[accessKey]?.toLowerCase();

    if (fa < fb) {
      return reverse ? -1 : 1;
    }
    if (fa > fb) {
      return reverse ? 1 : -1;
    }
    return 0;
  });
  return newList;
};

export { sortingTableData };

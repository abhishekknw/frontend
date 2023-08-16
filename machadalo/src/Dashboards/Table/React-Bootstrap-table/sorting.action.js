const SortingActions = () => {
  const sortTableData = (tableData, key, reverse) => {
    // return tableData.sort(
    //     (p1, p2) => reverse ? (p1[key] < p2[key]) ? 1 : (p1[key] > p2[key]) ? -1 : 0 : (p1[key] < p2[key]) ? -1 : (p1[key] > p2[key]) ? 1 : 0
    // );

    // return tableData.sort((a, b) => {
    //     let fa = a[key].toLowerCase(),
    //         fb = b[key].toLowerCase();

    //     if (fa < fb) {
    //         return -1;
    //     }
    //     if (fa > fb) {
    //         return 1;
    //     }
    //     return 0;
    // });
    let newList = [];
    if (!reverse) {
      newList = tableData.sort((a, b) => {
        console.log(a[key], b[key], '11111111111111');
        return a.id - b.id;
      });
      return newList;
    } else {
      newList = tableData.sort((a, b) => {
        console.log(a.id, b.id);
        return b.id - a.id;
      });
      return newList;
    }
  };
  return {
    sortTableData,
  };
};

export { SortingActions };

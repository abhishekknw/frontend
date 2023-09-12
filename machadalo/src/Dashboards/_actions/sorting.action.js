
const sortingTableData = (tableData, accessKey, reverse, type) => {
      let newList = [];
      let dataStep1 = tableData?.map((a) => ({ ...a }));
      if (type === 'Number') {
            newList = dataStep1?.sort((a, b) => {
                  let fa = a[accessKey],
                        fb = b[accessKey];

                  if (fa < fb) {
                        return reverse ? -1 : 1;
                  }
                  if (fa > fb) {
                        return reverse ? 1 : -1;
                  }
                  return 0;
            });
      } else {
            newList = dataStep1?.sort((a, b) => {
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
      }

      return newList;
};

export { sortingTableData };

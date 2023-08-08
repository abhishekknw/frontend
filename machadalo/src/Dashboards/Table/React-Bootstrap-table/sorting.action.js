const SortingActions = () => {

    const sortTableData = (tableData, key, reverse) => {
        return tableData.sort(
            (p1, p2) => reverse ? (p1[key] < p2[key]) ? 1 : (p1[key] > p2[key]) ? -1 : 0 : (p1[key] < p2[key]) ? -1 : (p1[key] > p2[key]) ? 1 : 0
        );
    };
    return {
        sortTableData,
    };
}

export { SortingActions };

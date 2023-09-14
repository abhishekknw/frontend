import React, { Component, useEffect, useState } from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import getEntityList from './EntityListGridConfig';
import LoadingWrapper from '../../Error/LoadingWrapper';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import CommonTable from '../../Shared/Tables';
import ReactPagination from '../../../Dashboards/Pagination/Pagination';

// class EntityList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       supplierType: '',
//       entityDetails: [],
//       isDataFetched: false,
//       isError: false,
//     };
//   }

//   componentDidMount() {
//     const { token } = this.props.auth;
//     const { supplier_type, city } = this.props.location.state;
//     this.setState({ supplierType: supplier_type });
//     request
//       .get(`${config.API_URL}/v0/ui/ops/supplier-list/${supplier_type}/?city=${city}`)
//       .set('Authorization', `JWT ${token}`)
//       .then((resp) => {
//         let entityDetails = resp.body.data;
//         if (entityDetails.length > 0)
//           entityDetails.forEach((entity) => (entity.supplierTypeCode = supplier_type));
//         this.setState({
//           entityDetails,
//           isDataFetched: true,
//         });
//       })
//       .catch((ex) => {
//         console.log('Failed to get data');
//         this.setState({ isError: true, isDataFetched: true });
//       });
//   }

//   render() {
//     const { city, name } = this.props.location.state;
//     const heading = `List of ${name} Entities of ${city}`;
//     return (
//       <div className="bootstrap-iso">
//         {this.state.isDataFetched ? (
//           <div>
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => this.props.history.push(`/r/operations-dashboard/entity`)}
//               style={{ marginTop: '10px', float: 'right', backgroundColor: 'rgb(232, 68, 120)' }}
//             >
//               <i className="fa fa-arrow-left" aria-hidden="true" />
//               &nbsp; Back
//             </button>
//             <InnerGrid
//               columns={getEntityList(this.state.entityDetails)}
//               data={this.state.entityDetails}
//               exportCsv={true}
//               search={true}
//               pagination={true}
//               headerValue={heading}
//               backgroundColor="#c7c7c7c9"
//             />
//           </div>
//         ) : (
//           <LoadingWrapper />
//         )}
//       </div>
//     );
//   }
// }

// export default EntityList;
export default function EntityList(props) {
  const { supplier_type, city } = props.location.state;
  const fetchWrapper = useFetchWrapper();
  const [entityDetails, setEntityDetails] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalSize, setTotalSize] = useState(0); // Total number of records

  const getEntityDetails = async () => {
    console.log('1111111111111111', currentPage);
    await fetchWrapper
      .get(`v0/ui/ops/supplier-list/${supplier_type}/?city=${city}&page=${currentPage + 1}`)
      .then((res) => {
        let entityDetails = res?.data;
        if (entityDetails.length > 0) {
          entityDetails.map((v) => ({ ...v, supplierTypeCode: supplier_type }));
        }
        setTotalSize(res?.total_supplier);
        setEntityDetails(entityDetails);
        setIsDataFetched(true);
      })
      .catch((ex) => {
        console.log('Failed to get data');
        setIsDataFetched(true);
      });
  };

  const handleTableChange = (page, sizePerPage) => {
    console.log(page, 'pagepagepagepage');
    setCurrentPage(page.selected);
    // setPageSize(sizePerPage);
  };

  useEffect(() => {
    getEntityDetails();
  }, [currentPage]);
  return (
    <div>
      {isDataFetched ? (
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => props.history.push(`/r/operations-dashboard/entity`)}
            style={{ marginTop: '10px', float: 'right', backgroundColor: 'rgb(232, 68, 120)' }}
          >
            <i className="fa fa-arrow-left" aria-hidden="true" />
            &nbsp; Back
          </button>
          <CommonTable
            id={'supplier_id'}
            columnsData={getEntityList(entityDetails)}
            rowData={entityDetails}
          />
          <ReactPagination
            pageNo={currentPage}
            pageSize={10}
            totalItems={totalSize}
            onPageChange={handleTableChange}
          />
        </div>
      ) : (
        <LoadingWrapper />
      )}
    </div>
  );
}

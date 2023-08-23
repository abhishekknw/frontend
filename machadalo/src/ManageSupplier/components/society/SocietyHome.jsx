import { useEffect, useState } from 'react';
import { SOCIETY } from '../../../constants/routes.constants';
import { useHistory, useParams } from 'react-router';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import Pagination from '../../../components/Pagination';
import loading_gif from '../../gif/loading.gif';

export default function SocietyHome() {
  const { state } = useParams();
  const history = useHistory();
  const fetchWrapper = useFetchWrapper();
  const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState();
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getList = (search_data) => {
    let query;
    if (state) {
      const index = stateList.findIndex((item) => item.state_code === state);
      if (search_data) {
        query = `?page=${pageNumber}&state=${state}&state_name=${stateList[index].state_name}&search=${search_data}`;
      } else {
        query = `?page=${pageNumber}&state=${state}&state_name=${stateList[index].state_name}`;
      }
    } else {
      if (search_data) {
        query = `?page=${pageNumber}&search=${search_data}`;
      } else {
        query = `?page=${pageNumber}`;
      }
    }
    fetchWrapper.get(ANG_APIS.GET_SOCIETY_LIST + query).then((res) => {
      setList(res.data);
      setLoading(false);
    });
  };

  const getState = () => {
    if (stateList.length === 0) {
      fetchWrapper
        .get(ANG_APIS.GETSTATE)
        .then((res) => {
          setStateList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getList();
    }
  };

  useEffect(() => {
    if (stateList.length > 0) getList();
  }, [stateList]);

  useEffect(() => {
    if (state) {
      getState();
    } else {
      getList();
    }
  }, [pageNumber]);

  const handleSupplierClick = (id) => {
    history.push(`${SOCIETY}/${id}`);
  };

  const handlePageChange = (page) => {
    setPageNumber(page.selected + 1);
  };

  const handleSearch = (e) => {
    getList(e.target.value);
  };

  return (
    <>
      <div className="middle-section">
        <h2 className="heading">Society Count: {list?.count}</h2>
        <div class="navbar-collapse tabBox" ng-controller="HeaderCtrl">
          <button
            type="button"
            class="smallBtn backbtn back_btn_list"
            onClick={() => history.goBack()}
          >
            Back
          </button>
        </div>
        <div className="dataShowBox" ui-view="">
          <div className="societyBox">
            <div className="searchBox">
              <input
                type="text"
                className="field"
                placeholder="Search Society"
                ng-model="search"
                ng-change="searchTable()"
                onChange={handleSearch}
              />
              <button>
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>

            <div className="searchBox">
              <input
                limit-to="10"
                type="number"
                className="form-control input-lg"
                ng-model="searchMobile"
                ng-change="mobileNumberSearch()"
                placeholder="Enter 10 Digits Mobile Number"
              />
              {/* <span ng-if="errorMsg && searchMobile" style={{ color: 'red' }}>Enter 10 Digits Mobile Number</span> */}
            </div>
            {/* <div ng-show="serverNotReachable">
                    <h2 style={{textAlign: 'center'}}>Server Not Reachable</h2>
                </div> */}

            {/* <div >
                    <h2 style="text-align: center">{responseError}</h2>
                </div> */}
            {loading ? (
              <div className="loading" ng-show="loading">
                <img
                  id="spinner"
                  style={{
                    height: '50px',
                    width: '50px',
                    margin: 'auto',
                    padding: '5px',
                    display: 'block',
                  }}
                  src={loading_gif}
                />
              </div>
            ) : (
              <div className="society">
                {list &&
                  list.societies.map((society, key) => {
                    return (
                      <div className="item" key={key}>
                        <div className="cardBox">
                          <div className="image">
                            <div
                              style={{
                                display:
                                  society.image_url == '' || !society.image_url ? 'block' : 'none',
                              }}
                            >
                              <img src="/images/no-image.jpg" alt="No image" />
                            </div>
                            {/* <div ng-if="society.image_url && society.image_url != ''">
                                    <img ng-src="{ImageBaseUrl + society.image_url}" />
                                </div> */}
                          </div>
                          <div className="caption">
                            <h4>
                              {society.name} ({society.supplier_id})
                            </h4>
                            <p>
                              {society.address1}, {society.address2},{society.type_quality},
                              {society.city}, {society.state}
                              {society.zipcode}
                            </p>
                            <a
                              onClick={() => handleSupplierClick(society.supplier_id)}
                              ng-click="load_society(society.supplier_id)"
                              className="smallBtn"
                              role="button"
                            >
                              Go To Society
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {/* <p ng-if="societies.length<=0"><center><h1>No Data Available</h1></center></p> */}
              </div>
            )}
          </div>
          <div className="list__footer">
            <Pagination pageSize={10} totalItems={list?.count} handlePageClick={handlePageChange} />
          </div>
        </div>
      </div>
    </>
  );
}

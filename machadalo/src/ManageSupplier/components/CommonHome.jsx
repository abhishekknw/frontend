import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { SupplierTypeAtom } from '../supplier.atom';
import { useFetchWrapper } from '../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../api.constants';
import { useHistory, useParams } from 'react-router';
import { getSupplierType, getTypeCode } from '../common.utils';
import { MANAGE_SUPPLIER } from '../../constants/routes.constants';
import Pagination from '../../components/Pagination';
import loading_gif from '../gif/loading.gif';

export default function CommonHome() {
  const { type, state } = useParams();
  const history = useHistory();
  const [list, setList] = useState();
  const fetchWrapper = useFetchWrapper();
  const [pageNumber, setPageNumber] = useState(1);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const SupplierType = useRecoilValue(SupplierTypeAtom);

  const getList = (search_data) => {
    let query;
    if (state) {
      const index = stateList.findIndex((item) => item.state_code === state);
      if (search_data) {
        query = `&page=${pageNumber}&state=${state}&state_name=${stateList[index].state_name}&search=${search_data}`;
      } else {
        query = `&page=${pageNumber}&state=${state}&state_name=${stateList[index].state_name}`;
      }
    } else {
      if (search_data) {
        query = `&page=${pageNumber}&search=${search_data}`;
      } else {
        query = `&page=${pageNumber}`;
      }
    }
    fetchWrapper.get(ANG_APIS.GET_LIST + getTypeCode(type) + query).then((res) => {
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
      if (type) getList();
    }
  }, [pageNumber]);

  const handleGoToClick = (id) => {
    history.push(MANAGE_SUPPLIER + type + '/' + id);
  };

  const handlePageChange = (page) => {
    setPageNumber(page.selected + 1);
  };

  const handleSearch = (e) => {
    getList(e.target.value);
  };

  return (
    <div className="middle-section">
      <h2 className="heading" ng-hide="gymCount==null">
        {getSupplierType(type)} Count: {list?.count}
      </h2>
      <div className="navbar-collapse tabBox" ng-controller="HeaderCtrl">
        <button
          onClick={() => history.goBack()}
          type="button"
          className="smallBtn backbtn back_btn_list"
          ng-click="back_to()"
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
              placeholder="Search Busshelter"
              ng-model="search"
              ng-change="searchTable()"
              onChange={handleSearch}
            />
            <button>
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
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
              {list ? (
                list.supplier_objects.map((item, key) => {
                  return (
                    <div className="item" key={key}>
                      <div className="cardBox">
                        <div className="image">
                          <div ng-show="item?.image_url == '' || !item?.image_url">
                            <img src="/images/no-image.jpg" alt="No image" />
                          </div>
                          <div ng-if="item?.image_url && item?.image_url != ''">
                            <img ng-src="{{ImageBaseUrl + item?.image_url}}" />
                          </div>
                        </div>
                        <div className="caption">
                          <h4>
                            {item?.supplier_name} ({item?.supplier_id})
                          </h4>

                          <p>
                            {item?.address_supplier?.address1}
                            <span ng-if="item?.address_supplier?.address1 && item?.address_supplier?.address2">
                              ,
                            </span>
                            {item?.address_supplier?.address2}
                            <span ng-if="(item?.address_supplier?.address2 && item?.address_supplier?.locality_rating) || (item?.address_supplier?.address1 && item?.address_supplier?.locality_rating)">
                              ,
                            </span>
                            {item?.address_supplier?.locality_rating}
                            <span ng-if="(item?.address_supplier?.locality_rating && item?.address_supplier?.city) || (item?.address_supplier?.address1 && item?.address_supplier?.city) || (item?.address_supplier?.address2 && item?.address_supplier?.city) ">
                              ,
                            </span>
                            {item?.address_supplier?.city}
                            <span ng-if="(item?.address_supplier?.locality_rating && item?.address_supplier?.state) || (item?.address_supplier?.address1 && item?.address_supplier?.state) || (item?.address_supplier?.address2 && item?.address_supplier?.state) ||  (item?.address_supplier?.city && item?.address_supplier?.state)">
                              ,
                            </span>
                            {item?.address_supplier?.state}
                            {item?.address_supplier?.zipcode}
                          </p>
                          <a
                            onClick={() => handleGoToClick(item?.supplier_id)}
                            className="smallBtn"
                            role="button"
                            ng
                          >
                            Go To {getSupplierType(type)}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p ng-if="busshelters.length<=0">
                  <center>
                    <h1>No Data Available</h1>
                  </center>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="list__footer">
        <Pagination pageSize={10} totalItems={list?.count} handlePageClick={handlePageChange} />
      </div>
    </div>
  );
}

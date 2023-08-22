import { useEffect, useState } from 'react';
import { societyRepository } from '../../repository/society.repo';
import { SOCIETY } from '../../../constants/routes.constants';
import { useHistory } from 'react-router';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function SocietyHome() {
  const history = useHistory();
  const fetchWrapper = useFetchWrapper();
  const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState();
  const [societyCount, setSocietyCount] = useState();

  const getList = () => {
    fetchWrapper.get(ANG_APIS.GET_SOCIETY_LIST + pageNumber).then((res) => {
      setList(res.data);
      setSocietyCount(res.data.count);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const handleSupplierClick = (id) => {
    history.push(`${SOCIETY}/${id}`);
  };

  return (
    <>
      <div className="middle-section">
        <h2 className="heading">Society Count: {societyCount}</h2>
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

            {/* <div className="loading" ng-show="loading">
                    <img id="spinner" style={{height: '50px', width: '50px', margin: 'auto',  padding: '5px', display: 'block'}} src="/images/loading.gif" />
                </div> */}
            {/* <div ng-show="serverNotReachable">
                    <h2 style={{textAlign: 'center'}}>Server Not Reachable</h2>
                </div> */}

            {/* <div >
                    <h2 style="text-align: center">{responseError}</h2>
                </div> */}
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
              {/* <p ng-if="societies.length<=0"><center><h1>{noData}</h1></center></p> */}
            </div>
          </div>
          {/* <div className="pageBox">
                <dir-pagination-controls max-size="11" direction-links="true" on-page-change="pageChangeHandler(newPageNumber)" boundary-links="true" ></dir-pagination-controls>
            </div> */}
        </div>
      </div>
    </>
  );
}

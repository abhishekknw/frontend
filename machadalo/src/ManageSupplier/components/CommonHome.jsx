import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { SupplierTypeAtom } from '../supplier.atom';
import { useFetchWrapper } from '../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../api.constants';
import { useHistory, useParams } from 'react-router';
import { getSupplierType, getTypeCode } from '../common.utils';
import { MANAGE_SUPPLIER } from '../../constants/routes.constants';

export default function CommonHome() {
  const { type } = useParams();
  const history = useHistory();
  const [list, setList] = useState();
  const fetchWrapper = useFetchWrapper();
  const [pageNumber, setPageNumber] = useState(1);
  const SupplierType = useRecoilValue(SupplierTypeAtom);

  const getList = () => {
    fetchWrapper.get(ANG_APIS.GET_LIST + getTypeCode(type) + '&page=' + pageNumber).then((res) => {
      setList(res.data);
    });
  };

  useEffect(() => {
    if (type) getList();
  }, []);

  const handleGoToClick = (id) => {
    history.push(MANAGE_SUPPLIER + type + '/' + id);
  };

  return (
    <div className="middle-section">
      <h2 className="heading" ng-hide="gymCount==null">
        {getSupplierType(type)} Count: {list?.count}
      </h2>
      <div className="collapse navbar-collapse tabBox divpadding" ng-controller="HeaderCtrl">
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
            />
            <button>
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
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
        </div>
      </div>
      <div className="pageBox">
        <dir-pagination-controls
          max-size="7"
          direction-links="true"
          boundary-links="true"
          on-page-change="pageChangeHandler(newPageNumber)"
        ></dir-pagination-controls>
      </div>
    </div>
  );
}

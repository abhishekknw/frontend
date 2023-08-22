import { useEffect, useState } from 'react';
import { corporateRepository } from '../../repository/corporate.repo';
import Corporate from './Corporate';
import { useHistory } from 'react-router';
import { CORPORATE } from '../../../constants/routes.constants';

export default function CorporateHome() {
  const history = useHistory();
  const [list, setList] = useState();
  const [isSupplierSelected, setIsSupplierSelected] = useState(false);

  const getList = () => {
    corporateRepository.getList().then((res) => {
      setList(res);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const handleCorporateClick = (id) => {
    history.push(`${CORPORATE}/${id}`);
    setIsSupplierSelected(true);
  };

  return (
    <>
      <div class="middle-section">
        <h2 class="heading" ng-hide="corporateCount == null">
          Corporate Count: {list?.count}
        </h2>
        <div class="collapse navbar-collapse tabBox divpadding" ng-controller="HeaderCtrl">
          <button type="button" class="smallBtn backbtn back_btn_list" ng-click="back_to()">
            Back
          </button>
        </div>
        <div class="dataShowBox" ui-view="">
          <div class="societyBox">
            <div class="searchBox">
              <input
                type="text"
                class="field"
                placeholder="search corporate"
                ng-model="search"
                ng-change="searchTable()"
              />
              <button>
                <i class="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
            {/* <div class="loading" ng-show="loading">
                            <img id="spinner" style=height : 50px; width : 50px; margin : auto;  padding: 5px; display: block;" src="/images/loading.gif" />
                        </div> */}
            {/* <div ng-show="serverNotReachable">
                            <h2 style="text-align: center">Server Not Reachable</h2>
                        </div> */}
            <div class="society">
              {list &&
                list.supplier_objects.map((corporate, key) => {
                  return (
                    <div
                      key={key}
                      class="item"
                      dir-paginate="corporate in corporates|itemsPerPage:10"
                      total-items="corporateCount"
                    >
                      <div class="cardBox">
                        <div class="image">
                          <div ng-show="corporate.image_url == '' || !corporate.image_url">
                            <img src="/images/no-image.jpg" alt="No image" />
                          </div>
                          <div ng-if="corporate.image_url && corporate.image_url != ''">
                            <img ng-src="{ImageBaseUrl + corporate.image_url}" />
                          </div>
                        </div>
                        <div class="caption">
                          <h4>
                            {corporate.supplier_name} ({corporate.supplier_id})
                          </h4>

                          <p>
                            {corporate.address_supplier.address1}
                            <span ng-if="corporate.address_supplier.address1 && corporate.address_supplier.address2">
                              ,
                            </span>
                            {corporate.address_supplier.address2}
                            <span ng-if="(corporate.address_supplier.address2 && corporate.address_supplier.corporate_type_quality) || (corporate.address_supplier.address1 && corporate.address_supplier.corporate_type_quality)">
                              ,
                            </span>
                            {corporate.address_supplier.corporate_type_quality}
                            <span ng-if="(corporate.address_supplier.corporate_type_quality && corporate.address_supplier.city) || (corporate.address_supplier.address1 && corporate.address_supplier.city) || (corporate.address_supplier.address2 && corporate.address_supplier.city) ">
                              ,
                            </span>
                            {corporate.address_supplier.city}
                            <span ng-if="(corporate.address_supplier.corporate_type_quality && corporate.address_supplier.state) || (corporate.address_supplier.address1 && corporate.address_supplier.state) || (corporate.address_supplier.address2 && corporate.address_supplier.state) ||  (corporate.address_supplier.city && corporate.address_supplier.state)">
                              ,
                            </span>
                            {corporate.address_supplier.state}

                            {corporate.address_supplier.zipcode}
                          </p>

                          <a
                            onClick={() => handleCorporateClick(corporate.supplier_id)}
                            class="smallBtn"
                            role="button"
                          >
                            Go To Corporate
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* <p ng-show="corporate_list_length"><center><h1>{noData}</h1></center></p> */}
            </div>
          </div>
          <div class="pageBox">
            <dir-pagination-controls
              max-size="7"
              direction-links="true"
              boundary-links="true"
              on-page-change="pageChangeHandler(newPageNumber)"
            ></dir-pagination-controls>
          </div>
        </div>
      </div>
    </>
  );
}

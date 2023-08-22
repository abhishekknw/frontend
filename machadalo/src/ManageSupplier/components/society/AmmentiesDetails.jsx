import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function AmmentiesDetails() {
  const fetchWrapper = useFetchWrapper();
  const [type, setType] = useState();

  const getAmmenity = () => {
    fetchWrapper.get(ANG_APIS.GET_AMMENITY).then((res) => {
      setType(res.data);
    });
  };

  useEffect(() => {
    getAmmenity();
  }, []);

  return (
    <div className="tab-inner">
      <form name="isForm" ng-submit="create()" role="form">
        <div className="">
          <h2 className="heading">Select Ammenties</h2>
          <div id="events">
            <span className="col-md-12" ng-repeat="type in ammentiesType">
              <label className="col-md-2 checkbox">
                {type?.name}
                <input type="checkbox" ng-model="type?.status" />
                <span className="checkmark"></span>
              </label>
              <div className="col-md-6">
                <input
                  ng-if="type?.status"
                  className="form-control"
                  id="comment_{{$index}}"
                  name="comment_{{$index}}"
                  placeholder="Comment"
                  type="text"
                  ng-model="type?.comments"
                />
              </div>
            </span>
          </div>
          <div>
            <div className="btn smallBtn" data-target="#addAmmenitiesOption" data-toggle="modal">
              Add New
            </div>
            <button type="submit" className="smallBtn">
              Save and Continue
            </button>
          </div>
        </div>
      </form>
      <div id="addAmmenitiesOption" className="modal fade">
        <div className="modal-dialog" style={{ width: '600px' }}>
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                ng-click="closeModelAmmenties()"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">Add New Ammenties</h4>
              <div className="modal-body">
                <form name="addAmmentiesOption" ng-submit="addAmmentiesNew()">
                  <div className="col-md-12">
                    <label>
                      Name <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      ng-model="formData.name"
                      name="name"
                      required="true"
                    />
                  </div>
                  <div className="col-md-12">
                    <label>
                      Code <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      placeholder="Code"
                      ng-model="formData.code"
                      onkeyup="this.value = this.value.toUpperCase();"
                      required="true"
                      maxlength="2"
                    />
                  </div>
                  <button type="submit" className="smallBtn">
                    Save
                  </button>
                  <div className="btn smallBtn" ng-click="closeModelAmmenties()">
                    Cancel
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useParams } from 'react-router';
import { Modal } from 'react-bootstrap';

export default function AmmentiesDetails() {
  const { id } = useParams();
  const fetchWrapper = useFetchWrapper();
  const [types, setTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const onAddClick = () => setShowModal(true);

  const getAmmenity = () => {
    fetchWrapper
      .get(ANG_APIS.GET_CORPORATE_AMMENITY + id + '&supplier_type_code=CP')
      .then((res) => {
        setTypes(res.data);
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
          {types.length > 0 &&
            types.map((type, key) => {
              <div id="events" key={key}>
                <span className="col-md-12" ng-repeat="type in ammentiesType">
                  <label className="col-md-2 checkbox">
                    {type?.name}
                    <input type="checkbox" ng-model="type?.status" />
                    <span className="checkmark"></span>
                  </label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="ammentiesComment"
                      placeholder="Comment"
                      ng-model="type?.comments"
                      name="{{type?.id}}"
                      ng-if="type?.status"
                    />
                  </div>
                  <br />
                </span>
              </div>;
            })}
          <div>
            <div
              onClick={onAddClick}
              className="btn smallBtn"
              data-target="#addAmmenitiesOption"
              data-toggle="modal"
            >
              Add New
            </div>
            <button type="submit" className="smallBtn">
              Save and Continue
            </button>
          </div>
        </div>
      </form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
    </div>
  );
}

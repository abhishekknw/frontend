export default function AmmentiesDetails() {
  return (
    <div class="tab-inner">
      <form name="isForm" ng-submit="create()" role="form">
        <div class="">
          <h2 class="heading">Select Ammenties</h2>
          <div id="events">
            <span class="col-md-12" ng-repeat="type in ammentiesType">
              <label class="col-md-2 checkbox">
                {type.name}
                <input type="checkbox" ng-model="type.status" />
                <span class="checkmark"></span>
              </label>
              <div class="col-md-6">
                <input
                  type="text"
                  class="ammentiesComment"
                  placeholder="Comment"
                  ng-model="type.comments"
                  name="{{type.id}}"
                  ng-if="type.status"
                />
              </div>
              <br />
            </span>
          </div>
          <div>
            <div class="btn smallBtn" data-target="#addAmmenitiesOption" data-toggle="modal">
              Add New
            </div>
            <button type="submit" class="smallBtn">
              Save and Continue
            </button>
          </div>
        </div>
      </form>
      <div id="addAmmenitiesOption" class="modal fade">
        <div class="modal-dialog" style="width:600px">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                ng-click="closeModelAmmenties()"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 class="modal-title">Add New Ammenties</h4>
              <div class="modal-body">
                <form name="addAmmentiesOption" ng-submit="addAmmentiesNew()">
                  <div class="col-md-12">
                    <label>
                      Name <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      ng-model="formData.name"
                      name="name"
                      required="true"
                    />
                  </div>
                  <div class="col-md-12">
                    <label>
                      Code <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="code"
                      placeholder="Code"
                      ng-model="formData.code"
                      onkeyup="this.value = this.value.toUpperCase();"
                      required="true"
                      maxlength="2"
                    />
                  </div>
                  <button type="submit" class="smallBtn">
                    Save
                  </button>
                  <div class="btn smallBtn" ng-click="closeModelAmmenties()">
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

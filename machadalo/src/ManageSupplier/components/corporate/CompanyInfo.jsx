export default function CompanyInfo() {
  return (
    <div>
      <form class="form-inline" role="form" name="company-info-form">
        <div class="table-responsive">
          <table class="table table-bordered table-hover" ng-model="companyList">
            <th class="col-md-3">Company Name</th>
            <th class="col-md-9">Company Details</th>
            <tr ng-repeat="company in companyList" ng-init="oneIndex = $index">
              <td>
                <div class="form-group" ng-model="companyList[oneIndex].name">
                  <label>{company.name}</label>
                </div>
              </td>
              <td ng-model="companyList[oneIndex].companyDetailList">
                <table class="table table-bordered table-hover">
                  <th class="col-md-3">Building</th>
                  <th class="col-md-3">Wing</th>
                  <th class="col-md-6">Floor Numbers</th>
                  <tr
                    ng-repeat="detail in companyList[oneIndex].companyDetailList"
                    ng-init="twoIndex = $index"
                  >
                    <td>
                      <div class="form-group">
                        <select
                          ng-model="companyList[oneIndex].companyDetailList[twoIndex].building_name"
                          ng-change="setBuilding(companyList[oneIndex].companyDetailList[twoIndex].building_name,oneIndex,twoIndex)"
                        >
                          <option
                            ng-repeat="building in listOfBuildingsArray[oneIndex].listOfBuildings"
                            value="{{building.building_name}}"
                          >
                            {building.building_name}
                          </option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <select ng-model="companyList[oneIndex].companyDetailList[twoIndex].wing_name">
                          <option
                            ng-repeat="wing in listOfBuildingsArray[oneIndex].listOfWingsArray[twoIndex].listOfWings"
                            value="{{wing.wing_name}}"
                          >
                            {wing.wing_name}
                          </option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div
                        style="width:280px;height:100px;overflow:scroll;display:inline;float:left;"
                        ng-model="companyList[oneIndex].companyDetailList[twoIndex].listOfFloors"
                      >
                        <button
                          class="btn btn-primary"
                          ng-click="addFloorNumber(oneIndex,twoIndex)"
                          style="float:right;margin-right:5px;"
                        >
                          Add
                        </button>

                        <div
                          style="display:inline"
                          ng-repeat="floor in companyList[oneIndex].companyDetailList[twoIndex].listOfFloors track by $index"
                        >
                          <input
                            type="number"
                            min={1}
                            class="form-control"
                            ng-model="companyList[oneIndex].companyDetailList[twoIndex].listOfFloors[$index].floor_number"
                            style="width:70px;margin-bottom:2px;"
                          />
                          <div
                            class="glyphicon glyphicon-remove"
                            style="margin-left:10px;"
                            ng-click="removeFloor(oneIndex,twoIndex,$index)"
                          ></div>
                        </div>
                      </div>
                      <div
                        class="glyphicon glyphicon-remove"
                        ng-click="removeCompanyDetail(oneIndex,twoIndex)"
                        style="float:right;display:inline"
                      ></div>
                    </td>
                  </tr>
                </table>
                <button
                  class="btn btn-primary"
                  ng-click="addCompanyDetail(oneIndex)"
                  style="float:right;"
                >
                  Add
                </button>
              </td>
            </tr>
          </table>
        </div>
        <button class="btn btn-info" ng-click="saveDetails(0)">
          Save changes
        </button>
        <br />
        <br />
      </form>
    </div>
  );
}

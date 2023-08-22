export default function BuildingInfo() {
  return (
    <div>
      <form class="form-inline" role="form" name="building-info-form">
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <tr ng-repeat="list in listOfBuildings track by $index">
              <td class="col-md-2" ng-model="buildingList">
                <div class="form-group">
                  <label>Building {list.building_name_temp}</label>
                  <div class="glyphicon glyphicon-remove" ng-click="removeBuilding($index)"></div>
                </div>
              </td>
              <td class="col-md-10">
                <table class="table table-bordered table-hover">
                  <tr>
                    <td>
                      <div class="form-group">
                        <label>Name of building</label>
                        <br />
                        <input
                          class="form-control"
                          type="text"
                          ng-model="listOfBuildings[$index].building_name"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <label>Number of wings</label>
                        <br />
                        <input
                          class="form-control"
                          type="number"
                          ng-model="listOfBuildings[$index].number_of_wings"
                          style="width:120px;"
                        />
                        <br />
                        <br />
                        <span
                          class="glyphicon glyphicon-arrow-right"
                          style="cursor:pointer;font-size:25px;margin-left:40%;"
                          ng-click="populateWings($index)"
                        ></span>
                      </div>
                    </td>
                    <td class="col-md-10">
                      <table class="table table-bordered table-hover">
                        <tr ng-repeat="wings in list.wingInfo track by $index">
                          <td class="col-md-2">
                            <div class="form-group">
                              <label>Wing {$index + 1}</label>
                              <br />
                            </div>
                          </td>
                          <td>
                            <div class="form-group">
                              <label>Name of wing</label>
                              <input
                                class="form-control"
                                type="text"
                                ng-model="list.wingInfo[$index].wing_name"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="form-group">
                              <label>Number of floors</label>
                              <input
                                class="form-control"
                                type="number"
                                ng-model="list.wingInfo[$index].number_of_floors"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
        <button class="btn btn-primary" style="float:right" ng-click="addBuilding()">
          Add a building
        </button>
        <br />
        <button class="btn btn-info" ng-click="saveDetails()">
          Save changes
        </button>
        <br />
        <br />
      </form>
    </div>
  );
}

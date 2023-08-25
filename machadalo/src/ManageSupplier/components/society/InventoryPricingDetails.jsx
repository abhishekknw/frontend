export default function InventoryPricingDetails() {
  return (
    <div class="page-container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Ad Inventory Id</th>
            <th>Release Location</th>
            <th>Inventory Status</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in model">
            <td style="text-align: -webkit-center">
              <span>{row.standee_inventory.adinventory_id}</span>
            </td>
            <td style="text-align: -webkit-center">
              <input type="text" style="text-align: center" ng-model="row.standee_location" />
            </td>
            <td style="text-align: -webkit-center">
              <select ng-model="row.inventory_status">
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </td>
          </tr>

          <tr>
            <td colspan="5">
              <input type="button" class="btn btn-primary" ng-click="onSubmit()" value="Update" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

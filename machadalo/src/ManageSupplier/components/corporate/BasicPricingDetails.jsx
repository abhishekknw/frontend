export default function BasicPricingDetails() {
  return (
    <div>
      <table class="table-data">
        <thead>
          <th>AdInventory Name</th>
          <th>Type</th>
          <th>(Campaign/Unit) Duration</th>
          <th>Suggested Supplier Price</th>
          <th>Actual Supplier Price</th>
        </thead>
        <tbody>
          <tr ng-repeat="row in model" ng-hide="!row.duration_type">
            <td>
              <span>{row.adinventory_type.adinventory_name}</span>
            </td>
            <td>
              <span>{row.adinventory_type.adinventory_type}</span>
            </td>
            <td>
              <span>{row.duration_type.duration_name}</span>
            </td>
            <td>
              <input
                type="text"
                ng-change="auto_change(row)"
                ng-model="row.suggested_supplier_price"
              />
            </td>
            <td>
              <input
                type="text"
                ng-change="auto_change(row)"
                ng-model="row.actual_supplier_price"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <input type="button" class="smallBtn" ng-click="onSubmit()" value="Update" />
    </div>
  );
}

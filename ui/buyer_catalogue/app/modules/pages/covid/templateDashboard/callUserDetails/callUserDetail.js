angular
  .module("machadaloCommon")
  .directive(
    "callUserDetailTemp",
    function (
      $window,
      $rootScope,
      constants,
      $timeout,
      permissions,
      AuthService,
      $anchorScroll,
      templateDashboardService,
    ) {
      return {
        templateUrl: "modules/pages/covid/templateDashboard/callUserDetails/callUserDetail.html",
        link: function ($scope, element, attrs) {
          $scope.showHideObj = { table: false };
          $scope.selectedCompanies = [];
          // $scope.example14data = [{ id: 6, label: "Dulux" }, { id: 8, label: "Berger" }, { id: 9, label: "Asian" }, { id: 1, label: "Test" }, { id: 10, label: "Asian" }, { id: 9, label: "Testing Company" }];
          $scope.example14settings = { scrollableHeight: '200px', scrollable: true };
          $scope.customTextForDropdown = { buttonDefaultText: 'Select Preffered Partner' };
          // $scope.example14settings = { smartButtonMaxItems: 3, smartButtonTextConverter: function (itemText, originalItem) { if (itemText === 'Jhon') { return 'Jhonny!'; } return itemText; } };

          $scope.getFormDataBySector = function () {
            $scope.showHideObj = { table: true, form: false };
          }

          $scope.showLeadDetails = function () {
            $scope.showHideObj = { table: true, form: true };
          }

          $scope.callUserDetailModal = function (data) {
            templateDashboardService.getDropdownData(data)
              .then(function onSuccess(response) {
                $scope.partnerCompanies = response.data.data.companies_sector_wise.map(obj => ({ ...obj, label: obj.name, id: obj.organisation_id }));
              }).catch(function onError(response) {
                console.log(response);
              })
          }
        }
      }
    })
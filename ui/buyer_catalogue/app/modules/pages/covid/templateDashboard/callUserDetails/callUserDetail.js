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
          $scope.formData = {};
          $scope.showHideObj = { table: false };
          $scope.selectedCompanies = [];
          $scope.example14settings = { scrollableHeight: '200px', scrollable: true };
          $scope.customTextForDropdown = { buttonDefaultText: 'Select Preffered Partner' };
          // $scope.example14settings = { smartButtonMaxItems: 3, smartButtonTextConverter: function (itemText, originalItem) { if (itemText === 'Jhon') { return 'Jhonny!'; } return itemText; } };
          $scope.sectorList = [
            {
              "business_type": "Education",
              "id": 1
            },
            {
              "business_type": "Real Estate",
              "id": 2
            },
            {
              "business_type": "Cars",
              "id": 3
            },
            {
              "business_type": "Painting",
              "id": 8
            },
            {
              "business_type": "Elevator",
              "id": 9
            },
            {
              "business_type": "Test sector",
              "id": 12
            },
            {
              "business_type": "Inverters",
              "id": 16
            },
            {
              "business_type": "CCTV",
              "id": 20
            },
            {
              "business_type": "AC and Heating Services",
              "id": 23
            },
            {
              "business_type": "2D MRI",
              "id": 40
            },
            {
              "business_type": "Assessment software",
              "id": 41
            },
            {
              "business_type": "Attendence Management Software",
              "id": 58
            },
            {
              "business_type": "Car Test Drive",
              "id": 75
            }
          ]
          $scope.getLeadsBySector = function () {
            $scope.showHideObj = { table: true, form: false };
            templateDashboardService.getLeadBySector($scope.formData)
              .then(function onSuccess(response) {
                console.log(response,"response")
              }).catch(function onError(response) {
                console.log(response);
              })
          }

          $scope.showLeadDetails = function () {
            $scope.showHideObj = { table: true, form: true };
          }

          $scope.callUserDetailModal = function (data) {
            $scope.formData.phone_number = data.phone_number
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
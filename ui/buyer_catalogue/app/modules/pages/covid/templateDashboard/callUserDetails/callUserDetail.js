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
      releaseCampaignService,
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
          $scope.getLeadsBySector = function () {
            $scope.showHideObj = { table: true, form: false };
            $scope.formData.sector = JSON.parse($scope.formData.sector);
            getDropdownData($scope.formData.sector.business_type);
            templateDashboardService.getLeadBySector($scope.formData)
              .then(function onSuccess(response) {
                $scope.sectorWiseLeads = response.data.data;
              }).catch(function onError(response) {
                console.log(response);
              })
          }

          $scope.showLeadDetails = function (leadData) {
            $scope.showHideObj = { table: true, form: true };
            $scope.formData.data = leadData;
            $scope.selectedCompanies = $scope.partnerCompanies?.filter((obj) => $scope.formData.data.preferred_company.includes(obj.organisation_id));
          }

          let getSectorByNumber = function (number) {
            templateDashboardService.getSectorByNumber(number)
              .then(function onSuccess(response) {
                $scope.sectorList = response.data.data;
              }).catch(function onError(response) {
                console.log(response);
              })
          }

          let getDropdownData = function (sector) {
            templateDashboardService.getDropdownData(sector)
              .then(function onSuccess(response) {
                $scope.partnerCompanies = response.data.data.companies_sector_wise.map(obj => ({ ...obj, label: obj.name, id: obj.organisation_id }));
                $scope.callStatusList = response.data.data.call_status;
                $scope.questionList = response.data.data.question;
              }).catch(function onError(response) {
                console.log(response);
              })
          }

          $scope.getCompanyName = function (id){
            let company = $scope.partnerCompanies.find(x => x.organisation_id === id);
            return company ? company.name : 'NA';
          }

          $scope.updateRequirement = function (data) {
            console.log(data)
            data.data.L4 = data.data.l1_answers;
            data.data.L5 = data.data.l1_answer_2;
            data.data.L6 = data.data.l2_answers;
            data.data['L4.1'] = null;
            data.data['L5.1'] = null;
            data.data['L6.1'] = null;
            let obj = {requirements:[data.data]}
            releaseCampaignService.updateRequirement(obj)
              .then(function onSuccess(response) {
                alert(111)
              }).catch(function onError(response) {
                console.log(response);
              })
          }

          $scope.callUserDetailModal = function (data) {
            $scope.formData.phone_number = data.phone_number
            getSectorByNumber($scope.formData.phone_number);
          }
        }
      }
    })
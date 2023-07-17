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
      releaseCampaignService,
      userService
    ) {
      return {
        templateUrl: "modules/pages/covid/templateDashboard/callUserDetails/callUserDetail.html",
        link: function ($scope, element, attrs) {

          $scope.showHideObj = {table:false};
          $scope.example14model = [];
          $scope.example14data = [{ id: 6, label: "Dulux" }, { id: 8, label: "Berger" }, { id: 9, label: "Asian" }, { id: 1, label: "Test" }, { id: 10, label: "Asian" }, { id: 9, label: "Testing Company" }];
          // $scope.example14settings = { scrollableHeight: '200px', scrollable: true };
          $scope.example14settings = { smartButtonMaxItems: 3, smartButtonTextConverter: function (itemText, originalItem) { if (itemText === 'Jhon') { return 'Jhonny!'; } return itemText; } };

          $scope.getFormDataBySector = function () {
            $scope.showHideObj = {table:true,form:false};
          }

          $scope.showLeadDetails = function (){
            $scope.showHideObj = {table:false,form:true};
          }
          $scope.backToTable = function () {
            $scope.showHideObj = {table:true,form:false};
          }
        }
      }
    })
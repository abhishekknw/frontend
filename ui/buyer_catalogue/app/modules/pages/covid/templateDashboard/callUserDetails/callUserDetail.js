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

            console.log("2133")
        }}})
angular.module('catalogueApp')

  .controller('SuspenseLeadSheetCtrl', ['$scope', '$rootScope', '$window', '$location', 'commonDataShare','constants', 'campaignListService','suspenseLeadService', 'cfpLoadingBar',
    function ($scope, $rootScope, $window, $location, commonDataShare, constants, campaignListService,suspenseLeadService, cfpLoadingBar) {
      
      $scope.currentPage=1;
      $scope.itemsPerPage=10;
      $scope.implementationTime = constants.requirement_implementation_time;
      $scope.meetingTime = constants.requirement_meeting_time;
      $scope.getAllSuspenseLeads = function (){
      suspenseLeadService.getAllSuspenseLead()
      .then(function onSuccess(response) {
        $scope.loading = response;
        $scope.AllSuspenseLeadData = response.data.data;
      }).catch(function onError(response) {
        console.log(response);
      })
    }

    $scope.getLeadsTabSuspenseLeads = function (){
      suspenseLeadService.getLeasTabSuspenseLead()
      .then(function onSuccess(response) {
        $scope.leadTabSuspenseLeadData = response.data.data.suspense_lead;
      }).catch(function onError(response) {
        console.log(response);
      })
    }
          
    }]);

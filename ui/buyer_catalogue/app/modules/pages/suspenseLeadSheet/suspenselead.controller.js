angular.module('catalogueApp')

  .controller('SuspenseLeadSheetCtrl', ['$scope', '$rootScope', '$window', '$location', 'commonDataShare','constants', 'campaignListService','suspenseLeadService', 'cfpLoadingBar',
    function ($scope, $rootScope, $window, $location, commonDataShare, constants, campaignListService,suspenseLeadService, cfpLoadingBar) {
    $scope.getAllSuspenseLeads = function (){
      suspenseLeadService.getAllSuspenseLead()
      .then(function onSuccess(response) {
        $scope.loading = response;
        $scope.AllSuspenseLeadData = response.data.data;
      }).catch(function onError(response) {
        console.log(response);
      })
   
    }
          
    }]);

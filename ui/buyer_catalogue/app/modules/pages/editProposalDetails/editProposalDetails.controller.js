angular.module('catalogueApp')

.controller('EditProposalDetailsCtrl', ['$scope', '$rootScope', '$window', '$location','commonDataShare','constants','editProposalDetailsService',
            '$stateParams',
    function ($scope, $rootScope, $window, $location , commonDataShare,constants,editProposalDetailsService, $stateParams) {

      var proposalId = $stateParams.proposalId;
      editProposalDetailsService.getProposalDetails(proposalId)
      .then(function onSuccess(response){
        console.log(response);
      }).catch(function onError(response){
        console.log(response);
      })
    }
]);

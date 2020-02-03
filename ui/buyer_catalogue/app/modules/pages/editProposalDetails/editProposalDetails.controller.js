angular.module('catalogueApp')

.controller('EditProposalDetailsCtrl', ['$scope', '$rootScope', '$window', '$location','commonDataShare','constants','editProposalDetailsService',
            '$stateParams',
    function ($scope, $rootScope, $window, $location , commonDataShare,constants,editProposalDetailsService, $stateParams) {

      var proposalId = $stateParams.proposalId;
      $scope.updateDisable = false;
      $scope.options = {};
      editProposalDetailsService.getProposalDetails(proposalId)
      .then(function onSuccess(response){
        console.log(response);
        $scope.proposalData = response.data.data;
        console.log('++++++++++++++-------------------',$scope.proposalData);
        $scope.proposalData.tentative_start_date = new Date($scope.proposalData.tentative_start_date);
        $scope.proposalData.tentative_end_date = new Date($scope.proposalData.tentative_end_date);
        $scope.proposalData.startDate = new Date($scope.proposalData.tentative_start_date);
        $scope.proposalData.endDate = new Date($scope.proposalData.tentative_end_date);
        $scope.options.minDate = $scope.proposalData.tentative_start_date;
      }).catch(function onError(response){
        console.log(response);
      })

      

        editProposalDetailsService.getOrganisations()
        .then(function onSuccess(response){
          $scope.organisationList = response.data.data;
          console.log($scope.organisationList);
            console.log(response);
        }).catch(function onError(response){
          console.log(response);
        })


        $scope.updateProposalDetails = function(){
          console.log($scope.proposalData);
          editProposalDetailsService.updateProposalDetails($scope.proposalData)
          .then(function onSuccess(response){
            console.log(response);
            swal(constants.name, constants.proposal_update_success, constants.success);
            // $location.path("/OpsDashBoard");
          }).catch(function onError(response){
            console.log(response);
          })
    }

    $scope.changeStartDate = function(){
      if($scope.proposalData.startDate){
        var startDate = new Date($scope.proposalData.startDate);
        $scope.proposalData.tentative_start_date = startDate;
        if($scope.proposalData.tentative_end_date && ($scope.proposalData.tentative_start_date > $scope.proposalData.tentative_end_date)){
          $scope.updateDisable = true;
          $scope.proposalData.tentative_end_date = "";
        } else {
          if(!$scope.proposalData.tentative_end_date && ($scope.proposalData.tentative_start_date < $scope.proposalData.endDate)){
            $scope.proposalData.tentative_end_date = $scope.proposalData.endDate;
            $scope.updateDisable = false;
          } else {
            $scope.updateDisable = false;
          }
        }
        $scope.options.minDate = $scope.proposalData.tentative_start_date;
      } else {
        $scope.updateDisable = true;
      }
    }
    $scope.changeEndDate = function(){
      if($scope.proposalData.tentative_end_date){
        var endDate = new Date($scope.proposalData.tentative_end_date);
         $scope.proposalData.tentative_end_date = endDate;
         $scope.updateDisable = false;
       }
    }
  }
]);

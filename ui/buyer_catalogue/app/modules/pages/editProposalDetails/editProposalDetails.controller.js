angular.module('catalogueApp')

  .controller('EditProposalDetailsCtrl', ['$scope', '$rootScope', '$window', '$location', 'commonDataShare', 'constants', 'editProposalDetailsService',
    '$stateParams',
    function ($scope, $rootScope, $window, $location, commonDataShare, constants, editProposalDetailsService, $stateParams) {

      var proposalId = $stateParams.proposalId;
      $scope.updateDisable = false;
      $scope.options = {};

      editProposalDetailsService.endCustomer()
        .then(function onSuccess(response) {
          $scope.endCustomerList = response.data.data;
        }).catch(function onError(response) {
          console.log(response);
        })

      editProposalDetailsService.getProposalDetails(proposalId)
        .then(function onSuccess(response) {
          $scope.proposalData = response.data.data;
          if (!$scope.proposalData.tentative_start_date) {
            $scope.proposalData.tentative_start_date = new Date();
          }

          if (!$scope.proposalData.tentative_end_date) {
            $scope.proposalData.tentative_end_date = new Date();
          }

          $scope.proposalData.tentative_start_date = new Date($scope.proposalData.tentative_start_date);
          $scope.proposalData.tentative_end_date = new Date($scope.proposalData.tentative_end_date);
          $scope.proposalData.startDate = new Date($scope.proposalData.tentative_start_date);
          $scope.proposalData.endDate = new Date($scope.proposalData.tentative_end_date);
          $scope.options.minDate = $scope.proposalData.tentative_start_date;
          $scope.proposalData.type_of_end_customer = JSON.stringify($scope.proposalData.type_of_end_customer);
        }).catch(function onError(response) {
          console.log(response);
        })



      editProposalDetailsService.getOrganisations()
        .then(function onSuccess(response) {
          $scope.organisationList = response.data.data;
        }).catch(function onError(response) {
          console.log(response);
        })

        


      $scope.updateProposalDetails = function () {
        editProposalDetailsService.updateProposalDetails($scope.proposalData)
          .then(function onSuccess(response) {
           // swal(constants.name, constants.proposal_update_success, constants.success);
            swal({
              title: "",
              text: constants.proposal_update_success,
              type: "success",
              confirmButtonText: "ok",
            },
              function (isConfirm) {
                console.log('')
                 if (isConfirm) {
                  //  $location.path("/campaignDecisionBoard");
                   window.location ="/#/campaignDecisionBoard"
                }
              }
            );
          }).catch(function onError(response) {
            console.log(response);
          })
      }

     

      $scope.changeStartDate = function () {
        if ($scope.proposalData.startDate) {
          var startDate = new Date($scope.proposalData.startDate);
          $scope.proposalData.tentative_start_date = startDate;
          if ($scope.proposalData.tentative_end_date && ($scope.proposalData.tentative_start_date > $scope.proposalData.tentative_end_date)) {
            $scope.updateDisable = true;
            $scope.proposalData.tentative_end_date = "";
          } else {
            if (!$scope.proposalData.tentative_end_date && ($scope.proposalData.tentative_start_date < $scope.proposalData.endDate)) {
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
      $scope.changeEndDate = function () {
        if ($scope.proposalData.tentative_end_date) {
          var endDate = new Date($scope.proposalData.tentative_end_date);
          $scope.proposalData.tentative_end_date = endDate;
          $scope.updateDisable = false;
        }
      }
    }
  ]);

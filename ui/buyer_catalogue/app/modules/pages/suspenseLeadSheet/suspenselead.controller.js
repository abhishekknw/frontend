angular.module('catalogueApp')

  .controller('SuspenseLeadSheetCtrl', ['$scope', '$rootScope', '$window', '$location', 'commonDataShare', 'constants', 'campaignListService', 'suspenseLeadService', 'cfpLoadingBar',
    function ($scope, $rootScope, $window, $location, commonDataShare, constants, campaignListService, suspenseLeadService, cfpLoadingBar) {

      $scope.currentPage = 1;
      $scope.itemsPerPage = 10;
      $scope.implementationTime = constants.requirement_implementation_time;
      $scope.meetingTime = constants.requirement_meeting_time;

      $scope.getAllSuspenseLeads = function () {
        suspenseLeadService.getAllSuspenseLead()
          .then(function onSuccess(response) {
            $scope.loading = response;
            $scope.AllSuspenseLeadData = response.data.data;
          }).catch(function onError(response) {
            console.log(response);
          })
      }

      $scope.getLeadsTabSuspenseLeads = function () {
        suspenseLeadService.getLeasTabSuspenseLead()
          .then(function onSuccess(response) {
            $scope.leadTabSuspenseLeadData = response.data.data.suspense_lead;
          }).catch(function onError(response) {
            console.log(response);
          })
      }

      $scope.removeSuspenseLead = function (id, index) {
        let removeData = {
          "suspense_ids": [id]
        }
        swal({
          title: 'Are you sure ?',
          text: 'Remove Suspense Lead',
          type: constants.warning,
          showCancelButton: true,
          confirmButtonClass: "btn-success",
          confirmButtonText: "Yes, Remove!",
          closeOnConfirm: false,
          closeOnCancel: true
        },
          function (confirm) {
            if (confirm) {
              suspenseLeadService.removeSuspenseLead(removeData)
                .then(function onSuccess(response) {
                  if (response && response.data.data.error) {
                    swal(constants.name, response.data.data.error, constants.error);
                  } else {
                    $scope.leadTabSuspenseLeadData[index].splice(index, 1)
                    swal(constants.name, constants.delete_success, constants.success);
                  }
                }).catch(function onError(response) {
                  console.log(response);
                });
            }
          });
      }

    }]);

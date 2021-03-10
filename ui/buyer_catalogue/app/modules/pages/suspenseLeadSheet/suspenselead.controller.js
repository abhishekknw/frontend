angular.module('catalogueApp')

  .controller('SuspenseLeadSheetCtrl', ['$scope', '$rootScope', '$window', '$location', 'commonDataShare', 'constants', 'campaignListService', 'suspenseLeadService', 'cfpLoadingBar',
    function ($scope, $rootScope, $window, $location, commonDataShare, constants, campaignListService, suspenseLeadService, cfpLoadingBar) {

      $scope.currentPage = 1;
      $scope.itemsPerPage = 10;
      $scope.implementationTime = constants.requirement_implementation_time;
      $scope.meetingTime = constants.requirement_meeting_time;
      $scope.dropdownSettings = {
        showCheckAll: false,
        scrollable: false,
        enableSearch: false,
        showUncheckAll: false
      };
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
            $scope.loading = response;
            $scope.leadTabData = response.data.data.suspense_lead;
            $scope.companiesData = response.data.data.companies;
            for (let k in $scope.companiesData) {
              $scope.companiesData[k].id = $scope.companiesData[k].organisation_id;
              $scope.companiesData[k].label = $scope.companiesData[k].name;
              if (k == response.data.data.companies.length - 1) {
                $scope.companiesData.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
              }
            }

            if($scope.leadTabData && $scope.leadTabData.length > 0){
              for(let i in $scope.leadTabData){
                if (!$scope.leadTabData[i].current_patner) {
                   $scope.leadTabData[i].current_patner = '';
                }
                var selected_preferred_patner = [];
                $scope.leadTabData[i].selected_preferred_patner = [];
                if ($scope.leadTabData[i].preferred_patner_other) {
                  $scope.otherPreferredPatner = true
                  $scope.leadTabData[i].otherPreferredPatner = true
                  $scope.leadTabData[i].preferred_patner.push("")
                }

                if ($scope.leadTabData[i].preferred_patner && $scope.leadTabData[i].preferred_patner.length > 0) {
                  for (let y in $scope.leadTabData[i].preferred_patner) {
                    var _index = $scope.companiesData.map(function (el) {
                      return el.organisation_id;
                    }).indexOf($scope.leadTabData[i].preferred_patner[y]);
                    if (_index != -1) {
                      selected_preferred_patner.push($scope.companiesData[_index])
                    }
                  }
                  $scope.leadTabData[i].selected_preferred_patner = selected_preferred_patner;
                }
                
              }
            }
         
          }).catch(function onError(response) {
            console.log(response);
          })
      }


      $scope.otherPreferredPatner = false;
      $scope.leadPreferredMulticheck = function (index) {
        // if ($scope.requirementDetailData[key] && $scope.requirementDetailData[key].requirements[index] && $scope.requirementDetailData[key].requirements[index].selected_preferred_patner && $scope.requirementDetailData[key].requirements[index].selected_preferred_patner.length > 0) {
        //   $scope.requirementDetailData[key].requirements[index].preferred_company = [];
        //   $scope.otherPreferredPatner = false;
        //   for (let i in $scope.requirementDetailData[key].requirements[index].selected_preferred_patner) {
        //     $scope.requirementDetailData[key].requirements[index].otherPreferredPatner = false
        //     if ($scope.requirementDetailData[key].requirements[index].selected_preferred_patner[i].id == 'other') {
        //       $scope.otherPreferredPatner = true
        //       $scope.requirementDetailData[key].requirements[index].otherPreferredPatner = true
        //     } 
        //     $scope.requirementDetailData[key].requirements[index].preferred_company.push($scope.requirementDetailData[key].requirements[index].selected_preferred_patner[i].id);
        //   }
        // }  
        // if($scope.requirementDetailData[key] && $scope.requirementDetailData[key].requirements[index] && $scope.requirementDetailData[key].requirements[index].selected_preferred_patner && $scope.requirementDetailData[key].requirements[index].selected_preferred_patner.length == 0){
        //   $scope.requirementDetailData[key].requirements[index].preferred_company = [];
        //   $scope.requirementDetailData[key].requirements[index].otherPreferredPatner = false
        // }
      }

      // $scope.leadsTabUpdate = function () {
      //   suspenseLeadService.leadsTabUpdate()
      //     .then(function onSuccess(response) {
      //       $scope.leadTabData = response.data.data.suspense_lead;
      //       $scope.companiesData = response.data.data.companies;
      //       for (let k in $scope.companiesData) {
      //         $scope.companiesData[k].id = $scope.companiesData[k].organisation_id;
      //         $scope.companiesData[k].label = $scope.companiesData[k].name;
      //         if (k == response.data.data.companies.length - 1) {
      //           $scope.companiesData.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
      //         }
      //       }

      //     }).catch(function onError(response) {
      //       console.log(response);
      //     })
      // }

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
                    $scope.leadTabData.splice(index, 1)
                    swal(constants.name, response.data.data.message, constants.success);
                  }
                }).catch(function onError(response) {
                  console.log(response);
                });
            }
          });
      }

    }]);

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
      commonDataShare,
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
          $scope.validations = { enableUpdate: false, addNewLead: false }
          $scope.propertyName = 'lead_date';
          $scope.reverse = true;
          // $scope.example14settings = { smartButtonMaxItems: 3, smartButtonTextConverter: function (itemText, originalItem) { if (itemText === 'Jhon') { return 'Jhonny!'; } return itemText; } };
          $scope.getLeadsBySector = function () {
            if ($scope.validations.addNewLead) {
              $scope.showHideObj = { table: false, form: true };
            } else {
              $scope.showHideObj = { table: true, form: false };
            }
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
            leadData.call_back_preference = leadData.call_back_preference === "NA" ? '' : leadData.call_back_preference
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

          let getPrefferedCompanyId = function () {
            let ids = [];
            $scope.selectedCompanies.map((item) => {
              ids.push(item.organisation_id);
            })
            return ids;
          }

          $scope.addNewLead = function () {
            $scope.validations = { ...$scope.validations, enableUpdate: true };
            $scope.showHideObj = { table: false, form: true };
            $scope.formData.data = {}
            $scope.selectedCompanies = [];
            $scope.partnerCompanies = [];
            $scope.questionList = [];
            // $scope.
            if ($scope.validations.addNewLead) {
              templateDashboardService.getSector()
                .then(function onSuccess(response) {
                  $scope.sectorList.sectors = response.data;
                }).catch(function onError(response) {
                  console.log(response);
                })
            } else {
              $scope.showHideObj = { table: false, form: false };
              getSectorByNumber($scope.formData.phone_number)
            }
          }

          $scope.editCurrentLead = function () {
            $scope.validations = { ...$scope.validations, addNewLead: false };
          }

          $scope.updateRequirement = function (data) {

            if ($scope.validations.addNewLead) {
              $scope.newLeadCreated(data)
            } else {

              data.data.L4 = data.data.l1_answers;
              data.data.L5 = data.data.l1_answer_2;
              data.data.L6 = data.data.l2_answers;
              data.data['L4.1'] = null;
              data.data['L5.1'] = null;
              data.data['L6.1'] = null;
              data.data['preferred_company'] = getPrefferedCompanyId();
              let obj = { requirements: [data.data] };
              swal({
                title: 'Are you sure ?',
                text: 'Updated Requirement',
                type: constants.warning,
                showCancelButton: true,
                confirmButtonClass: "btn-success",
                confirmButtonText: "Yes, Update!",
                closeOnConfirm: false,
                closeOnCancel: true
              },
                function (confirm) {
                  if (confirm) {
                    releaseCampaignService.updateRequirement(obj)
                      .then(function onSuccess(response) {
                        swal(constants.name, constants.update_success, constants.success);
                      }).catch(function onError(response) {
                        swal(constants.name, constants.save_error, constants.error);
                      })
                  }
                })

            }
          }

          $scope.newLeadCreated = function (data) {
            let browsed_ids = {
              'browsed_ids': [{
                'prefered_patners': getPrefferedCompanyId(),
                'prefered_patner_other': '',
                'phone_number': $scope.formData.phone_number,
                'sector_id': $scope.formData.sector.id,
                'current_patner_id': $scope.formData.data.current_company,
                'l1_answers': $scope.formData.data.l1_answers,
                'l1_answer_2': $scope.formData.data.l1_answer_2,
                'l2_answers': $scope.formData.data.l2_answers,
                'comment': $scope.formData.data.comment,
                'sub_sector_id': null,
                'shortlisted_spaces_id': null,
                'call_back_preference': '',
                'current_patner_feedback': '',
                'current_patner_feedback_reason': '',
                'campaign_id': '',
                'status': '',
                'supplier_type': $scope.userDetailData.type_of_entity,
                'supplier_id': $scope.userDetailData.supplier_id,
                'representative': $scope.formData.data.representative,
              }]
            }
            releaseCampaignService.newLeadCreated(browsed_ids)
              .then(function onSuccess(response) {
                if (response && response.data.data.error) {
                  swal(constants.name, response.data.data.error, constants.error);
                } else {
                  $scope.formData.data.varified_ops = "no";
                  $scope.formData.data.id = response.data.data.requermnet_id;
                  swal(constants.name, response.data.data.message, constants.success);
                }
              }).catch(function onError(response) {
                swal(constants.name, constants.save_error, constants.error);
                // commonDataShare.showErrorMessage(response);
              })
          }

          $scope.opsVerifyRequirement = function (id) {
            let verifyId = [id];
            swal({
              title: 'Are you sure ?',
              text: 'Do you want to proceed with sector level verification?',
              type: constants.warning,
              showCancelButton: true,
              confirmButtonClass: "btn-success",
              confirmButtonText: "Yes, Verify!",
              closeOnConfirm: false,
              closeOnCancel: true
            },
              function (confirm) {
                if (confirm) {
                  releaseCampaignService.opsVerifyRequirement({ "requirement_ids": verifyId })
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                        swal(constants.name, response.data.data.error, constants.error);
                      } else {
                        swal(constants.name, response.data.data.message, constants.success);
                        let index = $scope.sectorWiseLeads.findIndex((obj => obj.id == id));
                        $scope.sectorWiseLeads[index]['varified_ops'] = 'yes';
                      }
                    })
                    .catch(function onError(response) {
                      if (response && response.data && response.data.data && response.data.data.general_error && response.data.data.general_error.error) {
                        swal(constants.name, response.data.data.general_error.error, constants.error);
                      }
                      else if (response.statusText) {
                        swal(constants.name, response.statusText, constants.error);
                      }
                    })
                }
              })
          }

          let getOrganisationList = function () {
            AuthService.getOrganisationsForAssignment()
              .then(function onSuccess(response) {
                $scope.organisationList = response.data.data;
              }).catch(function onError(response) {
                console.log(response);
              })
          }

          let getUserDetails = function (number) {
            let param = { phoneNumber: number };
            AuthService.getAllUserDetailData(param)
              .then(function onSuccess(response) {
                $scope.userDetailData = response.data.data.payload;
              }).catch(function onError(response) {
                console.log(response);
              })
          }

          $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
          };

          $scope.callUserDetailModal = function (data) {
            $scope.interveneDashboard = { ...$scope.interveneDashboard, data: data };
            $('#onCallUserDetails').modal('show');
            if ($scope.validations.addNewLead) {
              $scope.addNewLead();
            } else {
              $scope.formData.phone_number = data.phone_number
              getSectorByNumber($scope.formData.phone_number);
              getUserDetails($scope.formData.phone_number)
              getOrganisationList()
            }
          }

          $scope.showHideIntervene = function () {
            $('#onCallUserDetails').modal('hide');
            $scope.interveneDashboard = { ...$scope.interveneDashboard, show: !$scope.interveneDashboard.show };
          }
        }
      }
    })
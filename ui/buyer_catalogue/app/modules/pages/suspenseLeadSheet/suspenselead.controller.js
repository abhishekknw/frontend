angular.module('catalogueApp')
  .controller('SuspenseLeadSheetCtrl', ['$scope', '$rootScope', '$window', '$location', 'commonDataShare', 'constants', 'campaignListService', 'suspenseLeadService', 'cfpLoadingBar',
    function ($scope, $rootScope, $window, $location, commonDataShare, constants, campaignListService, suspenseLeadService, cfpLoadingBar) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 10;
      $scope.totalData = 0;
      $scope.serial = 1
      // $scope.pageNo = 1;
      $scope.pagination = {
        current: 1
      };
      $scope.implementationTime = constants.requirement_implementation_time;
      $scope.meetingTime = constants.requirement_meeting_time;
      $scope.call_back_time = constants.call_back_time;
      $scope.current_patner_feedback = constants.current_patner_feedback;
      $scope.newRowData = {};
      $scope.filterLeadData = {};
      $scope.companiessuspenseLeads = [];


      $scope.dropdownSettings = {
        showCheckAll: false,
        scrollable: true,
        enableSearch: false,
        showUncheckAll: false,
        scrollableHeight: '250px',
      };


      $scope.areaSettings = {
        smartButtonMaxItems: 4,
        selectionLimit: 1,
        showCheckAll: false,
        showUncheckAll: false,
        scrollable: true,
        closeOnSelect: true,
        enableSearch: true,
        maxWidth: '180px !important',
        scrollableHeight: '250px',
        smartButtonTextConverter: function (itemText, originalItem) {
          return itemText
        }
      };

      $scope.supplierSettings = {
        smartButtonMaxItems: 4,
        selectionLimit: 1,
        showCheckAll: false,
        showUncheckAll: false,
        scrollable: true,
        closeOnSelect: true,
        enableSearch: true,
        scrollableHeight: '250px',
        width: '180px',

      };

      $scope.pocModel = [];
      $scope.setCurrentPage = function (tabName) {
        $scope.selectedTab = tabName;
        $scope.pagination = {
          current: 1
        };
        $scope.serial = 1
      }
      $scope.pageChanged = function (newPageNumber, tab) {
        // $scope.sno = ((newPage - 1) * 10);
        $scope.serial = newPageNumber * 10 - 9;
        // if(tab == 'browsed'){
        //   $scope.getBrowsedTabSuspenseLeads(newPageNumber);
        // } else {
        $scope.getLeadsTabSuspenseLeads(newPageNumber);
        // }
      };

      $scope.pageChangedBrowesd = function (newPageNumber, tab) {
        // $scope.sno = ((newPage - 1) * 10);
        $scope.serial = newPageNumber * 10 - 9;
        // if(tab == 'browsed'){
        $scope.getBrowsedTabSuspenseLeads(newPageNumber);
        // } else {
        //   $scope.getLeadsTabSuspenseLeads(newPageNumber);
        // }

      };

      $scope.initialData = function () {
        suspenseLeadService.initialData()
          .then(function onSuccess(response) {
            $scope.Cities = response.data.cities;
            $scope.supplierTypes = response.data.supplier_types;
          }).catch(function onError(response) {
            console.log(response);
          })
      }
      $scope.getAllSuspenseLeads = function () {
        suspenseLeadService.getAllSuspenseLead()
          .then(function onSuccess(response) {
            $scope.loading = response;
            $scope.AllSuspenseLeadData = response.data.data;
          }).catch(function onError(response) {
            console.log(response);
          })
      }

      $scope.getLeadsTabSuspenseLeads = function (page) {
        $scope.loading = null;
        if (!page) {
          page = 1;
        }
        $scope.leadTabData = [];
        $scope.totalCount = 0;
        $scope.companiesData = [{}];
        suspenseLeadService.getLeasTabSuspenseLead(page)
          .then(function onSuccess(response) {
            $scope.loading = response;
            $scope.leadTabData = response.data.data.suspense_lead.suspense_data;
            $scope.totalCount = response.data.data.suspense_lead.count;
            $scope.companiesData = response.data.data.companies;
            for (let k in $scope.companiesData) {
              $scope.companiesData[k].id = $scope.companiesData[k].organisation_id;
              $scope.companiesData[k].label = $scope.companiesData[k].name;
              if (k == response.data.data.companies.length - 1) {
                $scope.companiesData.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
              }
            }

            if ($scope.leadTabData && $scope.leadTabData.length > 0) {
              for (let i in $scope.leadTabData) {
                var localTime = moment.utc($scope.leadTabData[i].created_at).local();
                $scope.leadTabData[i].created_at = localTime._d;
                if (!$scope.leadTabData[i].current_patner) {
                  $scope.leadTabData[i].current_patner = '';
                }
                var selected_preferred_patner = [];
                $scope.leadTabData[i].selected_preferred_patner = [];
                if ($scope.leadTabData[i].prefered_patner_other) {
                  $scope.otherPreferredPatner = true
                  $scope.leadTabData[i].otherPreferredPatner = true
                  $scope.leadTabData[i].prefered_patners.push("")
                }

                if ($scope.leadTabData[i].prefered_patners && $scope.leadTabData[i].prefered_patners.length > 0) {
                  for (let y in $scope.leadTabData[i].prefered_patners) {
                    var _index = $scope.companiesData.map(function (el) {
                      return el.organisation_id;
                    }).indexOf($scope.leadTabData[i].prefered_patners[y]);
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
        suspenseLeadService.getSector()
          .then(function onSuccess(response) {
            $scope.sectorList = response.data;
          }).catch(function onError(response) {
            console.log(response)
          })

        suspenseLeadService.selectLeads()
          .then(function onSuccess(response) {
            $scope.leads_time = response.data;
            $scope.lastIndex = $scope.leads_time.data.length - 1;
            $scope.leads_Data = response.data.data;
          })
      }

      $scope.getBrowsedTabSuspenseLeads = function (page) {
        $scope.loading = null;
        if (!page) {
          page = 1;
        }
        $scope.leadTabData = [];
        $scope.totalCount = 0;
        $scope.companiesData = [{}];

        suspenseLeadService.getBrowsedTabSuspenseLead(page)
          .then(function onSuccess(response) {
            $scope.loading = response;
            $scope.leadTabData = response.data.data.suspense_lead.suspense_data;
            $scope.totalCount = response.data.data.suspense_lead.count;
            $scope.companiesData = response.data.data.companies;
            for (let k in $scope.companiesData) {
              $scope.companiesData[k].id = $scope.companiesData[k].organisation_id;
              $scope.companiesData[k].label = $scope.companiesData[k].name;
              if (k == response.data.data.companies.length - 1) {
                $scope.companiesData.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
              }
            }

            if ($scope.leadTabData && $scope.leadTabData.length > 0) {
              for (let i in $scope.leadTabData) {
                var localTime = moment.utc($scope.leadTabData[i].created_at).local();
                $scope.leadTabData[i].created_at = localTime._d;
                if (!$scope.leadTabData[i].current_patner) {
                  $scope.leadTabData[i].current_patner = '';
                }
                var selected_preferred_patner = [];
                $scope.leadTabData[i].selected_preferred_patner = [];
                if ($scope.leadTabData[i].prefered_patner_other) {
                  $scope.otherPreferredPatner = true
                  $scope.leadTabData[i].otherPreferredPatner = true
                  $scope.leadTabData[i].prefered_patners.push("")
                }

                if ($scope.leadTabData[i].prefered_patners && $scope.leadTabData[i].prefered_patners.length > 0) {
                  for (let y in $scope.leadTabData[i].prefered_patners) {
                    var _index = $scope.companiesData.map(function (el) {
                      return el.organisation_id;
                    }).indexOf($scope.leadTabData[i].prefered_patners[y]);
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
        if ($scope.leadTabData[index] && $scope.leadTabData[index].selected_preferred_patner && $scope.leadTabData[index].selected_preferred_patner.length > 0) {
          $scope.leadTabData[index].prefered_patners = [];
          $scope.otherPreferredPatner = false;
          for (let i in $scope.leadTabData[index].selected_preferred_patner) {
            $scope.leadTabData[index].otherPreferredPatner = false
            if ($scope.leadTabData[index].selected_preferred_patner[i].id == 'other') {
              $scope.otherPreferredPatner = true
              $scope.leadTabData[index].otherPreferredPatner = true
            }
            $scope.leadTabData[index].prefered_patners.push($scope.leadTabData[index].selected_preferred_patner[i].id);
          }

        }
        if ($scope.leadTabData[index] && $scope.leadTabData[index].selected_preferred_patner && $scope.leadTabData[index].selected_preferred_patner.length == 0) {
          $scope.leadTabData[index].prefered_patners = [];
          $scope.leadTabData[index].otherPreferredPatner = false
        }
      }

      $scope.updateLeadTab = function (index) {
        if ($scope.leadTabData[index].current_patner) {
          $scope.leadTabData[index].current_patner_other = null;
        }

        let otherPreferred = null
        if ($scope.leadTabData[index].prefered_patners && $scope.leadTabData[index].prefered_patners.length > 0) {
          for (let i in $scope.leadTabData[index].prefered_patners) {
            if (!$scope.leadTabData[index].prefered_patners[i]) {
              $scope.leadTabData[index].prefered_patners.splice(i, 1);
            }
            if ($scope.leadTabData[index].prefered_patners[i] == 'other') {
              otherPreferred = $scope.leadTabData[index].prefered_patner_other
            }
          }
        }
        let data = [{
          "sector_name":  $scope.filterBrowsedLeadData($scope.leadTabData[index].sector_id),
          "_id": $scope.leadTabData[index]._id,
          "implementation_timeline": $scope.leadTabData[index].implementation_timeline,
          "meating_timeline": $scope.leadTabData[index].meating_timeline,
          "comment": $scope.leadTabData[index].comment,
          "current_patner_id": $scope.leadTabData[index].current_patner,
          "current_patner_other": $scope.leadTabData[index].current_patner_other ? $scope.leadTabData[index].current_patner_other : null,
          "prefered_patners_id": $scope.leadTabData[index].prefered_patners,
          "prefered_patner_other": otherPreferred,
          "call_back_preference": $scope.leadTabData[index].call_back_preference,
          "current_patner_feedback": $scope.leadTabData[index].current_patner_feedback,
          "current_patner_feedback_reason": $scope.leadTabData[index].current_patner_feedback_reason,
          "l3_answer_1": $scope.leadTabData[index].l3_answer_1,
          "internal_comment": $scope.leadTabData[index].internal_comment,
          "L4": $scope.leadTabData[index].l1_answers,
          "L5": $scope.leadTabData[index].l1_answer_2,
          "L6": $scope.leadTabData[index].l2_answers,
        }];

        let update = {
          "suspense_leads": data
        }
        swal({
          title: 'Are you sure ?',
          text: 'Update Suspense Lead',
          type: constants.warning,
          showCancelButton: true,
          confirmButtonClass: "btn-success",
          confirmButtonText: "Yes, Save!",
          closeOnConfirm: false,
          closeOnCancel: true

        },
          function (confirm) {
            if (confirm) {
              suspenseLeadService.updateLeadTab(update)
                .then(function onSuccess(response) {
                  if (response && response.data.data.error) {
                    swal(constants.name, response.data.data.error, constants.error);
                  } else {
                    swal(constants.name, response.data.data.message, constants.success);
                    $scope.leadTabData[index].lead_status = response.data.data.lead_status;
                    if ($scope.leadTabData[index].meating_timeline == 'not given') {
                      $scope.leadTabData.splice(index, 1)
                    }
                  }
                }).catch(function onError(response) {
                  console.log(response);
                })
            }
          });
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
                    $scope.leadTabData.splice(index, 1)
                    swal(constants.name, response.data.data.message, constants.success);
                  }
                }).catch(function onError(response) {
                  console.log(response);
                });
            }
          });
      }

      $scope.supplierForAddUpdate = function (index) {
        // $scope.selectedSupplierName = [];
        $scope.supplierForAddUpdateData = {};
        // $scope.supplierForAddUpdateData = JSON.parse(JSON.stringify($scope.leadTabData[index]));
        $scope.supplierForAddUpdateData = $scope.leadTabData[index];
        if ($scope.supplierForAddUpdateData.supplier_type == 'RS') {
          $scope.designation = constants.designation_society;
        } else if ($scope.supplierForAddUpdateData.supplier_type == 'CP') {
          $scope.designation = constants.designation_corporate;

        } else if ($scope.supplierForAddUpdateData.supplier_type == 'GY' || $scope.supplierForAddUpdateData.supplier_type == 'SA') {
          $scope.designation = constants.designation_saloon;

        } else if ($scope.supplierForAddUpdateData.supplier_type == 'EI' || $scope.supplierForAddUpdateData.supplier_type == 'GN') {
          $scope.designation = constants.designation_gantry;
        } else {
          $scope.designation = constants.designation_bus_shelter;
        }
        $scope.leadDataIndex = index;
        // $scope.supplierForAddUpdateData['city_id'] = 1;
        // $scope.supplierForAddUpdateData['city'] = "mumbai";
        //  $scope.supplierForAddUpdateData['area_id'] = 1;
        //  $scope.supplierForAddUpdateData['area'] = "Andheri(E)";
        //  $scope.supplierForAddUpdateData['supplier_name'] = 'aaaaa';
        //  $scope.supplierForAddUpdateData['supplier_id'] = 121221;
        $scope.suppliersName = [];
        $scope.Areas = [];
        $scope.model = {};
        $scope.selectedArea = [];
        $scope.selectedSupplierName = [];
        if ($scope.supplierForAddUpdateData.city_id) {
          $scope.model = {
            city_id: $scope.supplierForAddUpdateData.city_id,
            city: $scope.supplierForAddUpdateData.city,
          }
          $scope.getArea(true)
        }
        if ($scope.supplierForAddUpdateData.is_updated == "True") {
          $scope.selectArea();
        }
        // if($scope.supplierForAddUpdateData.area_id){
        //   $scope.selectedArea = [{id:1,label:"Andheri(E)"}]
        // }
        // console.log('ddddddddddddddddddddddddd',$scope.supplierForAddUpdateData);
        // console.log('dddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeee',$scope.selectedArea);
        // console.log('111111111111111',$scope.Cities);
        // $scope.supplierForAddUpdateData.supplier_name = 'ffffffffffffff'
        // if($scope.supplierForAddUpdateData.supplier_name){
        //   $scope.selectedSupplierName.push({'label':$scope.supplierForAddUpdateData.supplier_name})
        // }
      }

      $scope.getArea = function (value) {
        $scope.selectedSupplierName = [];
        var id = $scope.supplierForAddUpdateData.city_id;
        var localindex_index = $scope.Cities.map(function (el) {
          return el.id;
        }).indexOf(JSON.parse($scope.supplierForAddUpdateData.city_id));
        if (localindex_index != -1) {
          $scope.supplierForAddUpdateData['city_id'] = $scope.Cities[localindex_index].id;
          $scope.supplierForAddUpdateData['city'] = $scope.Cities[localindex_index].city_name;
        }
        suspenseLeadService.getAreas('areas', id)
          .success(function (response) {
            $scope.selectedArea = [];
            // if (response != null) {
            //   $scope.Areas = [];
            //    $scope.supplierForAddUpdateData['area_id'] = "";
            //    $scope.supplierForAddUpdateData['area'] = "";
            //   $scope.selectedArea = [];
            //   if (response.length == 0) {
            //     $scope.areas.push({ "$$hashkey": "-1", "area_code": "NA", "city_code": "NA", "id": "-1", "label": "Not Available" });
            //   }
            //   else {
            //     $scope.Areas = response;
            //   }
            // }
            if (!value) {
              $scope.supplierForAddUpdateData['area_id'] = "";
              $scope.supplierForAddUpdateData['area'] = "";
            }
            $scope.Areas = response;
          });
      }

      // $scope.selectedArea = [];
      // $scope.selectedSupplierName = [];
      $scope.selectArea = function () {
        $scope.suppliersName = [];
        $scope.selectedSupplierName = [];
        if ($scope.selectedArea && $scope.selectedArea.length > 0) {
          $scope.supplierForAddUpdateData['area'] = $scope.selectedArea[0].label;
          $scope.supplierForAddUpdateData['area_id'] = $scope.selectedArea[0].id;
        }
        let data = {
          city: $scope.supplierForAddUpdateData.city,
          area: $scope.supplierForAddUpdateData.area,
          supplier_type: $scope.supplierForAddUpdateData.supplier_type
        }
        suspenseLeadService.getSupplierNameList(data)
          .then(function onSuccess(response) {
            if (response) {
              $scope.suppliersName = response.data.data.supplier_list;
              if ($scope.suppliersName.length > 0) {
                for (let i in $scope.suppliersName) {
                  if ($scope.suppliersName[i].supplier_name) {
                    $scope.suppliersName[i].label = $scope.suppliersName[i].supplier_name;
                  } else {
                    $scope.suppliersName[i].label = $scope.suppliersName[i].society_name;
                  }

                  $scope.suppliersName[i].id = $scope.suppliersName[i].supplier_id;
                }
              }
            }
          }).catch(function onError(response) {
            console.log(response);
          });
        //  }
      }

      $scope.selectSupplierName = function () {
        if ($scope.selectedSupplierName && $scope.selectedSupplierName.length > 0) {
          $scope.supplierForAddUpdateData['supplier_name'] = $scope.selectedSupplierName[0].label;
          $scope.supplierForAddUpdateData['supplier_id'] = $scope.selectedSupplierName[0].id;

        }
      }

      $scope.addUpdateSupplier = function () {
        if ($scope.supplierForAddUpdateData.isNewArea) {
          $scope.supplierForAddUpdateData.area_id = null
        }
        if ($scope.supplierForAddUpdateData.isNewSupplier) {
          $scope.supplierForAddUpdateData.supplier_id = null
        }
        if ($scope.supplierForAddUpdateData.address1) {
          $scope.supplierForAddUpdateData.address = $scope.supplierForAddUpdateData.address1;
        }
        $scope.supplierForAddUpdateData.suspense_id = $scope.supplierForAddUpdateData._id
        suspenseLeadService.addUpdateSupplier($scope.supplierForAddUpdateData)
          .then(function onSuccess(response) {
            if (response && response.data.data.error) {
              swal(constants.name, response.data.data.error, constants.error);
            } else {
              $scope.leadTabData[$scope.leadDataIndex] = $scope.supplierForAddUpdateData;
              $scope.leadTabData[$scope.leadDataIndex].is_updated = 'True';

              for (let i in $scope.leadTabData) {
                if ($scope.leadTabData[i].phone_number == $scope.supplierForAddUpdateData.phone_number) {
                  $scope.leadTabData[i].is_updated = 'True';
                }
              }

              swal(constants.name, response.data.data.message, constants.success);
            }
          }).catch(function onError(response) {
            console.log(response);
          });
      }

      $scope.openAddPoc = function (id, supplier_type) {
        if (supplier_type == 'RS') {
          $scope.poc_designation = constants.designation_society;
        } else if (supplier_type == 'CP') {
          $scope.poc_designation = constants.designation_corporate;

        } else if (supplier_type == 'GY' || supplier_type == 'SA') {
          $scope.poc_designation = constants.designation_saloon;

        } else if (supplier_type == 'EI' || supplier_type == 'GN') {
          $scope.poc_designation = constants.designation_gantry;
        } else {
          $scope.poc_designation = constants.designation_bus_shelter;
        }
        $scope.suspenseLeadId = id
        $scope.pocModel = [{
          'mobile': '',
          'name': '',
          'contact_type': ''
        }];
        suspenseLeadService.getPocList(id)
          .then(function onSuccess(response) {
            if (response) {
              $scope.pocModel = response.data.data.contact_detail;
            }
          }).catch(function onError(response) {
            console.log(response);
          });
      }

      $scope.addPocField = function () {
        $scope.pocModel.push({
          'mobile': '',
          'name': '',
          'contact_type': ''
        });
      }

      $scope.removePocField = function (index) {
        $scope.pocModel.splice(index, 1)
      }

      $scope.addPoc = function () {
        let data = {
          'suspense_id': $scope.suspenseLeadId,
          "contactData": $scope.pocModel
        }
        suspenseLeadService.addPoc(data)
          .then(function onSuccess(response) {
            if (response && response.data.data.error) {
              swal(constants.name, response.data.data.error, constants.error);
            } else {
              swal(constants.name, response.data.data.message, constants.success);
            }
          }).catch(function onError(response) {
            console.log(response);
          });
      }

      $scope.opsVerify = function (id) {
        suspenseLeadService.opsVerify(id)
          .then(function onSuccess(response) {
            if (response && response.data.data.error) {
              swal(constants.name, response.data.data.error, constants.error);
            } else {
              swal(constants.name, response.data.data.message, constants.success);
            }
          }).catch(function onError(response) {
            if (response && response.data && response.data.data && response.data.data.general_error && response.data.data.general_error.error) {
              swal(constants.name, response.data.data.general_error.error, constants.error);
            }
          });
      }

      $scope.changeArea = function () {
        if ($scope.supplierForAddUpdateData.isNewArea && $scope.supplierForAddUpdateData.area != "") {
          $scope.supplierForAddUpdateData.old_area = $scope.supplierForAddUpdateData.area;
          $scope.supplierForAddUpdateData.old_area_id = $scope.supplierForAddUpdateData.area_id;
          $scope.supplierForAddUpdateData.area = "";
          $scope.supplierForAddUpdateData.area_id = "";
          $scope.selectedArea = [];
        } else {
          //remove commnet if  $scope.selectedArea comment in if case
          if ($scope.supplierForAddUpdateData.old_area) {
            $scope.supplierForAddUpdateData.area = $scope.supplierForAddUpdateData.old_area;
            $scope.supplierForAddUpdateData.area_id = $scope.supplierForAddUpdateData.old_area_id;
            // $scope.selectedArea[0].label = $scope.supplierForAddUpdateData.old_area;;
            //  $scope.selectedArea[0].id = $scope.supplierForAddUpdateData.old_area_id;;
          }

        }
      }

      $scope.addNewSupplier = function () {
        if ($scope.supplierForAddUpdateData.isNewSupplier && $scope.supplierForAddUpdateData.supplier_id) {
          $scope.supplierForAddUpdateData.old_supplier_name = $scope.supplierForAddUpdateData.supplier_name;
          $scope.supplierForAddUpdateData.old_supplier_id = $scope.supplierForAddUpdateData.supplier_id;
          $scope.supplierForAddUpdateData.supplier_name = "";
          $scope.supplierForAddUpdateData.supplier_id = "";
          $scope.selectedSupplierName = [];
        } else {
          if ($scope.supplierForAddUpdateData.old_supplier_id) {
            $scope.supplierForAddUpdateData.supplier_name = $scope.supplierForAddUpdateData.old_supplier_name;
            $scope.supplierForAddUpdateData.supplier_id = $scope.supplierForAddUpdateData.old_supplier_id;
          }
        }
      }

      $scope.changeSupplier = function (type) {
        if (type == 'RS') {
          $scope.designation = constants.designation_society;
        } else if (type == 'CP') {
          $scope.designation = constants.designation_corporate;

        } else if (type == 'GY' || type == 'SA') {
          $scope.designation = constants.designation_saloon;

        } else if (type == 'EI' || type == 'GN') {
          $scope.designation = constants.designation_gantry;

        } else {
          $scope.designation = constants.designation_bus_shelter;
        }
        $scope.supplierForAddUpdateData.designation = "";
      }

      // $scope.showHideRow = function () {
      //   $scope.newRowShowHide = $scope.newRowShowHide === true ? false : true;
      // }

      $scope.sectorBrowseLead = function (name, id) {
        for (let i in $scope.leads_Data) {
          for (let j in $scope.leads_Data[i]) {
            if (name === j) {
              $scope.leads_Data_browsed = $scope.leads_Data[i][name];
              $scope.filterLeadData[id] = $scope.leads_Data_browsed;
              break;
            }
          }
        }
      }
      $scope.filterBrowsedLeadData = function (sectorName) {
        for (i in $scope.sectorList) {
          if ($scope.sectorList[i].id == sectorName) {
            let sector = $scope.sectorList[i].business_type;
            $scope.sectorBrowseLead(sector.toLowerCase(), sectorName);
            return sector;
          }
        }
      }
      
      $scope.suspenseLeadFilterData = function (id,index) {
        $scope.newSelected_preferred_patner = [];
        if(index!=undefined){
          $scope.leadTabData[index].sector_name = $scope.filterBrowsedLeadData(id);
          $scope.leadTabData[index].sector_id = id;
          $scope.leadTabData[index].selected_preferred_patner = [];
        }
        else{
          $scope.filterBrowsedLeadData(id);
          $scope.sector_id = id;
        }

        suspenseLeadService.filterPreferredPartner(id)
          .then(function onSuccess(response) {
            $scope.suspensePreferred_partnerList = response.data.data.companies;
            $scope.suspenseSub_sectorList = response.data.data.sub_sector;
            if(index==undefined){
              $scope.newRowPreferred_partnerList = response.data.data.companies;
              $scope.newRowSub_sectorList = response.data.data.sub_sector;
              for (let i in $scope.newRowPreferred_partnerList) {
                $scope.newRowPreferred_partnerList[i]['label'] = $scope.newRowPreferred_partnerList[i]['name'];
              }
            }
            for (let i in $scope.suspensePreferred_partnerList) {
              $scope.suspensePreferred_partnerList[i]['label'] = $scope.suspensePreferred_partnerList[i]['name'];
            }
            let companyBysector = $scope.companiesData;
            let companyPartner = $scope.suspensePreferred_partnerList;
            let hash = {};
            for (let i of companyBysector.concat(companyPartner)) {
              if (!hash[i]) {
                hash[i.organisation_id] = i;
              }
            }
            $scope.companiesData = [];
            for (let i in hash) {
              $scope.companiesData.push(hash[i])
            }
          }).catch(function onError(response) {
            console.log(response);
          })
      }

      let getsubSectorName = function(id){
        for (let i in $scope.suspenseSub_sectorList){
          if($scope.suspenseSub_sectorList[i].id == id){
            return $scope.suspenseSub_sectorList[i].business_sub_type;
          }
        }
      }

      $scope.SaveNewRowData = function (row) {
        let arrayPrefered = [];
        for (let i in $scope.newSelected_preferred_patner) {
          arrayPrefered.push($scope.newSelected_preferred_patner[i].organisation_id);
        }
        let data = [{
          "phone_number": $scope.newRowData.phone_number,
          "sector_name" : $scope.filterBrowsedLeadData($scope.newRowData.sector),
          "sub_sector" : getsubSectorName($scope.newRowData.subSector),
          "call_back_preference": null,
          "current_patner_feedback": $scope.newRowData.current_patner_feedback,
          "current_patner_feedback_reason": $scope.newRowData.current_patner_feedback_reason,
          "current_patner_id": $scope.newRowData.current_patner,
          "current_patner_other": $scope.newRowData.current_patner_other,
          "implementation_timeline": $scope.newRowData.implementation_timeline,
          "internal_comment": $scope.newRowData.internal_comment,
          "meating_timeline": $scope.newRowData.meating_timeline,
          "prefered_patner_other": $scope.newRowData.prefered_patner_other,
          "prefered_patners_id": arrayPrefered,
          "calling_state": null,
          "L4": $scope.newRowData.L4,
          "L5": $scope.newRowData.L5,
          "L6": $scope.newRowData.L6,
          "_id": null
        }];
        console.log(data, "datadata")
        let update = {
          "suspense_leads": data
        }
        swal({
          title: 'Are you sure ?',
          text: 'Update Suspense Lead',
          type: constants.warning,
          showCancelButton: true,
          confirmButtonClass: "btn-success",
          confirmButtonText: "Yes, Save!",
          closeOnConfirm: false,
          closeOnCancel: true

        },
          function (confirm) {
            if (confirm) {
              suspenseLeadService.saveNewLeadTabSuspenseLead(update)
                .then(function onSuccess(response) {
                  $scope.newRowData = {};
                  $scope.newSelected_preferred_patner = [];
                  if (response && response.data.data.error) {
                    swal(constants.name, response.data.data.error, constants.error);
                  } else {
                    swal(constants.name, response.data.data.message, constants.success);
                    // $scope.leadTabData[index].lead_status = response.data.data.lead_status;
                    // if ($scope.leadTabData[index].meating_timeline == 'not given') {
                    //   $scope.leadTabData.splice(index, 1)
                    // }
                  }
                }).catch(function onError(response) {
                  console.log(response);
                })
            }
          });
      }

      $scope.suspenseLeadsPreferredPartner = function (id) {
        while ($scope.companiessuspenseLeads.length) {
          $scope.companiessuspenseLeads.pop();
        }
        var i = 0;
        for (let k in $scope.companiesData) {
          if ($scope.companiesData[k].business_type !== undefined) {
            if (id == $scope.companiesData[k].business_type[0]) {
              $scope.companiessuspenseLeads[i] = $scope.companiesData[k];
              $scope.companiessuspenseLeads[i].id = $scope.companiesData[k].organisation_id;
              $scope.companiessuspenseLeads[i].label = $scope.companiesData[k].name;
              $scope.companiessuspenseLeads[i].sector = $scope.companiesData[k].business_type[0];
              i++;
            }
          }
        }
        $scope.filterBrowsedLeadData(id);
      }
    }]);

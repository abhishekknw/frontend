angular.module('catalogueApp')
  .controller('SuspenseLeadSheetCtrl', ['$scope', '$rootScope', '$window', '$location', 'commonDataShare', 'constants', 'campaignListService', 'suspenseLeadService', 'cfpLoadingBar',
    function ($scope, $rootScope, $window, $location, commonDataShare, constants, campaignListService, suspenseLeadService, cfpLoadingBar) {

      $scope.currentPage = 1;
      $scope.itemsPerPage = 10;
      $scope.implementationTime = constants.requirement_implementation_time;
      $scope.meetingTime = constants.requirement_meeting_time;
      $scope.call_back_time = constants.call_back_time;
      $scope.current_patner_feedback = constants.current_patner_feedback;
      $scope.dropdownSettings = {
        showCheckAll: false,
        scrollable: false,
        enableSearch: false,
        showUncheckAll: false
      };


      $scope.areaSettings = {
        smartButtonMaxItems: 4,
        selectionLimit: 1,
        showCheckAll: false,
        showUncheckAll: false,
        scrollable: true,
        closeOnSelect: true,
        enableSearch: true,
          smartButtonTextConverter: function(itemText, originalItem) {
            console.log('ddddddddddddddd',itemText);
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

      };

      $scope.pocModel = [];


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

            if ($scope.leadTabData && $scope.leadTabData.length > 0) {
              for (let i in $scope.leadTabData) {
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
        if($scope.leadTabData[index].current_patner){
          $scope.leadTabData[index].current_patner_other = null;
        }
        
        let otherPreferred = null
        if($scope.leadTabData[index].prefered_patners && $scope.leadTabData[index].prefered_patners.length > 0){
          for(let i in $scope.leadTabData[index].prefered_patners){
            if(!$scope.leadTabData[index].prefered_patners[i]){
              $scope.leadTabData[index].prefered_patners.splice(i, 1);
            }
            if($scope.leadTabData[index].prefered_patners[i] == 'other'){
              otherPreferred =  $scope.leadTabData[index].prefered_patner_other
            }
          }
        }
        let data = [{
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
          "current_patner_feedback_reason": $scope.leadTabData[index].current_patner_feedback_reason
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
        console.log('88888888888888888888888888888',$scope.leadTabData[index]);
        // $scope.selectedSupplierName = [];
        $scope.supplierForAddUpdateData = {};
        $scope.supplierForAddUpdateData = JSON.parse(JSON.stringify($scope.leadTabData[index]));
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
        if($scope.supplierForAddUpdateData.city_id){
          $scope.model = {
            city_id:$scope.supplierForAddUpdateData.city_id,
            city:$scope.supplierForAddUpdateData.city,
          }
          $scope.getArea(true)
        } 
        if($scope.supplierForAddUpdateData.is_updated == "True"){
          $scope.selectArea ();
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
        var id = $scope.model.city_id;
        var localindex_index = $scope.Cities.map(function (el) {
          return el.id;
        }).indexOf(JSON.parse($scope.model.city_id));
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
            if(!value){
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
                    $scope.suppliersName[i].label = $scope.suppliersName[i].supplier_name;
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
        }
      }

      $scope.addUpdateSupplier = function () {
        if($scope.supplierForAddUpdateData.isNewArea){
          $scope.supplierForAddUpdateData.area_id = null
        }
        if($scope.supplierForAddUpdateData.isNewSupplier){
          $scope.supplierForAddUpdateData.supplier_id = null
        }
        if($scope.supplierForAddUpdateData.address1){
          $scope.supplierForAddUpdateData.address = $scope.supplierForAddUpdateData.address1;
        }
        $scope.supplierForAddUpdateData.suspense_id = $scope.supplierForAddUpdateData._id
        suspenseLeadService.addUpdateSupplier($scope.supplierForAddUpdateData)
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
      
      $scope.openAddPoc = function (id) {
        $scope.suspenseLeadId = id
        $scope.pocModel = [{
          'mobile':'',
          'name':'',
          'contact_type':''
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
          'mobile':'',
          'name':'',
          'contact_type':''
        });
      }

      $scope.removePocField = function (index) {
        $scope.pocModel.splice(index,1)
      }

      $scope.addPoc = function () {
        let data = {
         'suspense_id':$scope.suspenseLeadId,
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

      $scope.opsVerify = function(id){
        suspenseLeadService.opsVerify(id)
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

      $scope.changeArea = function(){
        if($scope.supplierForAddUpdateData.isNewArea && $scope.supplierForAddUpdateData.area !=""){
          $scope.supplierForAddUpdateData.old_area = $scope.supplierForAddUpdateData.area;
          $scope.supplierForAddUpdateData.old_area_id = $scope.supplierForAddUpdateData.area_id;
          $scope.supplierForAddUpdateData.area = "";
          $scope.supplierForAddUpdateData.area_id = "";
        //  $scope.selectedArea = [];
        } else {
          //remove commnet if  $scope.selectedArea comment in if case
          if($scope.supplierForAddUpdateData.old_area){
            $scope.supplierForAddUpdateData.area = $scope.supplierForAddUpdateData.old_area;
            $scope.supplierForAddUpdateData.area_id = $scope.supplierForAddUpdateData.old_area_id;
          }
         
        }
      }

      $scope.changeSupplier = function(){
        if($scope.supplierForAddUpdateData.isNewSupplier && $scope.supplierForAddUpdateData.supplier_id){
          $scope.supplierForAddUpdateData.old_supplier_name = $scope.supplierForAddUpdateData.supplier_name;
          $scope.supplierForAddUpdateData.old_supplier_id = $scope.supplierForAddUpdateData.supplier_id ;
          $scope.supplierForAddUpdateData.supplier_name = "";
          $scope.supplierForAddUpdateData.supplier_id = "";
          $scope.selectedSupplierName = [];
        } else {
          if($scope.supplierForAddUpdateData.old_supplier_id){
            $scope.supplierForAddUpdateData.supplier_name = $scope.supplierForAddUpdateData.old_supplier_name;
            $scope.supplierForAddUpdateData.supplier_id = $scope.supplierForAddUpdateData.old_supplier_id;
          }
        }
      }

    }]);

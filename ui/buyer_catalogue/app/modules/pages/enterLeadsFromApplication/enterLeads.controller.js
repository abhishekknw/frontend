"use strict";
angular.module('catalogueApp')
    .controller('enterLeadFormCtrl', function($scope, $rootScope, $stateParams, $window, $location, enterLeadsService ,$http, constants, permissions, commonDataShare) {
      $scope.campaign_id = $stateParams.proposal_id;
      console.log($scope.campaign_id, "hello");
      console.log("hello");
      // $scope.enterLeads = function(supplier){
      //   console.log($scope.leadFormFields);
      //   $scope.leadModelData = [];
      //   $scope.leadModelData = angular.copy($scope.leadFormFields.leads_form_items);
      //   $scope.leadFormId = $scope.leadFormFields.leads_form_id;
      //   $scope.changeView('enterLeads',$scope.campaignInfo,$scope.leadFormFields);
      //   $scope.supplierData = supplier;
      //
      //   console.log(supplier);
      // }
      // $scope.leadModelData = [];
      // $scope.leadModelData = angular.copy($scope.leadFormFields.leads_form_items);
      // $scope.leadFormId = $scope.leadFormFields.leads_form_id;

      $scope.saveLeads = function(){
        var data = {
          supplier_id : $scope.supplierData.supplier_id,
          leads_form_entries : []
        };
        angular.forEach($scope.leadModelData, function(item){
            var temp_data = {
              item_id : item.item_id,
              value : item.value
            }
            data.leads_form_entries.push(temp_data);
        });
        console.log(data);
        enterLeadsService.saveLeads($scope.leadFormId,data)
        .then(function onSuccess(response){
          console.log(response);
          $scope.leadModelData = [];
          $scope.leadModelData = angular.copy($scope.leadFormFields.leads_form_items);
          swal(constants.name, constants.add_data_success, constants.success);
        }).catch(function onError(response){
          console.log(response);
        })

      }

    });

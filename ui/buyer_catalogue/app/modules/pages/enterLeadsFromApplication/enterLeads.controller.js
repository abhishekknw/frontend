"use strict";
angular.module('catalogueApp')
    .controller('enterLeadFormCtrl', function($scope, $rootScope, $stateParams, $window, $location, enterLeadsService ,$http, constants, permissions, commonDataShare) {
      $scope.formId = $stateParams.formId;
      $scope.supplierId = $stateParams.supplierId;
      $scope.searchQuery = undefined;
      $scope.editLeads = false;
      $scope.leadKeyTypes = [
        {name : 'STRING'},
        {name : 'INT'},
        {name : 'EMAIL'},
        {name : 'PASSWORD'},
        {name : 'PHONE'},
        {name : 'RADIO'},
        {name : 'DROPDOWN'},
        {name : 'CHECKBOX'},
        {name : 'TEXTAREA'},
        {name : 'BOOLEAN'},
        {name : 'FLOAT'},
        {name : 'DATE'}
      ]; 
      $scope.keyTypesMap = {
        'STRING' : 'text',
        'INT' : 'number',
        'EMAIL' : 'email',
        'PASSWORD' : 'password',
        'PHONE' : 'number',
        'RADIO' : 'radio',
        'CHECKBOX' : 'checkbox',
        'TEXTAREA' : 'textarea',
        'BOOLEAN' : 'radio',
        'FLOAT' : 'number',
        'DATE' : 'date'
      }
      var leadFormField = {
        key_name : '',
        key_type : '',
        order_id : 1
      };
      var getLeadFormDetails = function(){
        enterLeadsService.getLeadFormDetails($scope.formId)
        .then(function onSuccess(response){
          $scope.loading = response;
          $scope.leadModelData = response.data.data.leads_form_items;
          console.log($scope.leadModelData);
        }).catch(function onError(response){
         
        })
      }
      var getSupplierDetails = function(){
        enterLeadsService.getSupplierDetails($scope.supplierId)
        .then(function onSuccess(response){
          $scope.supplierData = response.data.data;
        }).catch(function onError(response){
         
        })
      }      

      var getLeadsCount = function(){
        enterLeadsService.getEntryListLeadsCount($scope.formId,$scope.supplierId)
        .then(function onSuccess(response){
          $scope.leadsListCount = response.data.data;
        }).catch(function onError(response){
          
        })
      }

      getLeadFormDetails();
      getSupplierDetails();
      getLeadsCount();
      $scope.saveLeads = function(){
        var data = {
          supplier_id : $scope.supplierId,
          leads_form_entries : []
        };
        angular.forEach($scope.leadModelData, function(item){
            var temp_data = {
              item_id : item.item_id,
              value : item.value
            }
            data.leads_form_entries.push(temp_data);
        });
       
        enterLeadsService.saveLeads($scope.formId,data)
        .then(function onSuccess(response){
          $scope.leadModelData = [];
          getLeadFormDetails();
          swal(constants.name, constants.add_data_success, constants.success);
        }).catch(function onError(response){
        })
      }
      $scope.getLeadsBySupplier = function(){
        $scope.viewLeads = true;
        enterLeadsService.getLeadsBySupplier($scope.formId,$scope.supplierId)
        .then(function onSuccess(response){
          $scope.leadsData = response.data.data;
        }).catch(function onError(response){
        })
      }
      $scope.changeView = function(){
        $scope.viewLeads = false;
      }

      $scope.getEditLeads = function(entryId){
        console.log("entryId", entryId);
        console.log("leadsData.values", $scope.leadsData.values);
        $scope.entryId = entryId;
          enterLeadsService.getEditLeads($scope.formId,$scope.supplierId,entryId)
          .then(function onSuccess(response){
            $scope.viewLeads = false;
            $scope.editLeads = true;
            $scope.leadModelData = response.data.data.leads_form_items;
          }).catch(function onError(response){
          })
      }

      $scope.updateLeadDetails = function(entryId){
          enterLeadsService.updateLeadDetails($scope.formId,$scope.supplierId,$scope.entryId,$scope.leadModelData)
          .then(function onSuccess(response){
            $scope.viewLeads = false;
            $scope.editLeads = true;
            swal(constants.name, constants.update_leads_data_success, constants.success);
          }).catch(function onError(response){
            
          })
      }
      
      $scope.setCheckBoxValue = function(isSelected,index,values){
        if(!values.hasOwnProperty('value')){
          values['value'] = [];
        }
        if(isSelected){
          values.value.push($scope.leadChBoxKeyOptions[index].name);
        }else {
          values.value.splice(values.value.indexOf($scope.leadChBoxKeyOptions[index].name),1);
        }
      }

      $scope.getCheckBoxValues = function(values){
        $scope.leadChBoxKeyOptions = [];
        angular.forEach(values, function(value,index){
          $scope.leadChBoxKeyOptions[index] = {
            name : value, selected : false
          };
        });
      }

      $scope.setHotLeadValue = function(item,value,itemValue){
        if(value){
          item.value = item.hot_lead_criteria;
        }else{
          item.value = null;
        }
      }

    });

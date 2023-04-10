"use strict";
angular.module('catalogueApp')
    .controller('CampaignLeadsCtrl', function($scope, $rootScope, $stateParams, $window, $location, $filter, campaignLeadsService ,$http, constants, permissions, commonDataShare, Upload) {

      $scope.modelData = {};
      $scope.modelData['alias_data'] = [];
      $scope.savedFormFields = [];
      $scope.importLeadsData = [];
      $scope.showImportTable = false;
      $scope.hotnessMapping = {};
      $scope.uploadfile = true; // added for loading spinner active/deactive
      $scope.textValue = {
        value:""
      }; 
      $scope.globalHotLeadCriteria=[{
      name: "is_hot_level_" + 1,
      operation: [
        {
          name : 'or',
          items: [] 
        }        
      ]
    }]
      $scope.formName = {
        name : undefined
      }
      var formatedLeadsList = [];
      $scope.leadFormFields = [];
      $scope.optionForm = {
        option : undefined
      };

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
      $scope.campaignHeaders = [
        {header : 'Campaign Name'},
        {header : 'Start Date'},
        {header : 'End Date'},
        {header : 'Action'},

      ];
      var formFieldsStruct = [
        {name : 'firstname1' , value : false},
        {name : 'lastname1' , value : false},
        {name : 'firstname2' , value : false},
        {name : 'lastname2' , value : false},
        {name : 'mobile1' , value : false},
        {name : 'mobile2' , value : false},
        {name : 'phone' , value : false},
        {name : 'email1' , value : false},
        {name : 'email2' , value : false},
        {name : 'address' , value : false},
        {name : 'alphanumeric1', value : false},
        {name : 'alphanumeric2', value : false},
        {name : 'alphanumeric3', value : false},
        {name : 'alphanumeric4', value : false},
        {name : 'boolean1', value : false},
        {name : 'boolean2', value : false},
        {name : 'boolean3', value : false},
        {name : 'boolean4', value : false},
        {name : 'float1', value : false},
        {name : 'float2', value : false},
        {name : 'number1', value : false},
        {name : 'number2', value : false},
        {name : 'date1', value : false},
        {name : 'date2', value : false},
        {name : 'is_interested', value : false},
      ];
      $scope.formFields = angular.copy(formFieldsStruct);
      $scope.views = {
        viewLeads : false,
        createForm : false,
        campaigns : true,
        addLeads : false,
        enterLeads : false,
        selectSuppliers : false,
      }
      $scope.saveLeadForm = function(){
        var data = {
          leads_form_name : $scope.formName.name,
          leads_form_items : $scope.leadFormFields,
          global_hot_lead_criteria: $scope.createCriteriaObject(),
          hotness_mapping: $scope.hotnessMapping
        }
        angular.forEach(data.leads_form_items, function(item,index){
          item.order_id = index + 1;
        })
        campaignLeadsService.createLeadForm(data,$scope.campaignId)
        .then(function onSuccess(response){
           if(document.getElementById("globalHotLeadsCriteria").style.display == 'block'){
              angular.element('#globalHotLeadsCriteria').modal('hide');
            }
          $scope.leadFormFields = [];
          $scope.formName.name = undefined;
          swal(constants.name,constants.create_success,constants.success);
          $scope.changeView('viewLeadForms',$scope.campaignInfo);
        }).catch(function onError(response){
          console.log(response);
        })
      }
      //checkSavedFields function is used to disable selected fields in dropdown ui of formFields
      var checkSavedFields = function(){
        angular.forEach($scope.modelData.alias_data, function(field){
          $scope.savedFormFields[field.original_name] = field;
        })
      }
      var getLeads = function(campaignId){
        campaignLeadsService.getLeads(campaignId)
        .then(function onSuccess(response){
          $scope.leadsData = response.data.data;
        }).catch(function onError(response){
          console.log(response);
        })
      }
      
      $scope.getEntryListLeads = function(){
        $scope.entryListLeadsData =[];
         campaignLeadsService.getEntryListLeads($scope.leadFormId,$scope.supplierData.supplier_id)
          .then(function onSuccess(response){
            $scope.showLeads = true;
            if(response.data && response.data.data && response.data.data.values){
              for (let x in response.data.data.values){
                if(response.data.data.values[x]){
                  for(let y in response.data.data.values[x]){
                    if(response.data.data.values[x][y].key_type == "DATE"){
                      response.data.data.values[x][y].value =$filter('date')(new Date(response.data.data.values[x][y].value),'yyyy-MM-dd');
                    }
                  }
                }
              }
            }
            $scope.entryListLeadsData = response.data.data;
         }).catch(function onError(response){
         })
      }

      $scope.getEntryListLeadsCount = function(){
        $scope.supplierLeadsCount = 0;
        campaignLeadsService.getEntryListLeadsCount($scope.leadFormId,$scope.supplierData.supplier_id)
          .then(function onSuccess(response){
             $scope.supplierLeadsCount = response.data.data;
          }).catch(function onError(response){
            
          })
      }

      $scope.getEntryListLeadsByForm = function(leadFormId){
        $scope.formId = leadFormId.leads_form_id;
        $scope.entryListLeadsData =[];
         campaignLeadsService.getEntryListLeads(leadFormId.leads_form_id)
         .then(function onSuccess(response){
           $scope.showLeads = true;
           $scope.entryListLeadsData = response.data.data;
         }).catch(function onError(response){
           console.log(response);
         })
      }

      $scope.addField = function(){
        var data = {
          alias : '',
          original_name : ''
        }
        $scope.modelData.alias_data.push(data);
        checkSavedFields();
      }
      $scope.removeField = function(index){
        $scope.leadFormFields.splice(index,1);
      }
      $scope.removeNewField = function(index){
        $scope.newLeadFormFields.splice(index,1);
      }
      $scope.addField();
      let getCampaignDetails = function(page,search){
        let assigned_by = '0';
        let fetch_all = '0';
        let userId = $rootScope.globals.currentUser.user_id;
        if (!page){
          page = 1;
        }
        if (!search){
          search = '';
        }
        $scope.Data = [];
        campaignLeadsService.getCampaignDetails(assigned_by,userId,fetch_all,page,search)
          .then(function onSuccess(response){
            $scope.campaigns = response.data.data.list;
            $scope.Data = $scope.campaigns;
            $scope.loading = response.data.data;
          })
          .catch(function onError(response){
            console.log(response);
          });
      }
      getCampaignDetails();
      
      $scope.pageChanged = function (page,search) {
        getCampaignDetails(page,search);
      }
      $scope.searchProposalDetails = function(search){
        if(search.length == 0 || search.length > 2){
          getCampaignDetails(1,search);
        }
      } 

      $scope.changeView = function(view,campaign,formFields){
        $scope.views = {
          createForm : false,
          viewLeads : false,
          campaigns : false,
          addLeads : false,
          enterLeads : false,
          selectSuppliers : false,
          importLeads : false,
          viewLeadForms : false,
          viewLeadsByFormCampaign : false,
          viewleadForEdit : false,
          viewLeadsBySupplier : false
        }

        $scope.views[view] = true;
        $scope.campaignInfo = campaign;
        if(formFields){
          if(formFields == "viewleadForEdit"){
            $scope.views.viewleadForEdit = true;
          }else{
            $scope.leadFormFields = formFields;
          } 
        }
        switch(true){
          case $scope.views.viewLeadForms:
            $scope.campaignId = campaign.campaign.proposal_id;
            $scope.savedFormFields = [];
            getCampaignLeadForms($scope.campaignId);
            break;
          case $scope.views.selectSuppliers:
            $scope.campaignId = campaign.campaign.proposal_id;
            getShortlistedSuppliers($scope.campaignId);
            $scope.campaignName = campaign.campaign.name;
            break;
          case $scope.views.viewLeads:
            $scope.campaignId = campaign.campaign.proposal_id;
            $scope.campaignName = campaign.campaign.name;
            $scope.getEntryListLeads($scope.campaignId);
            break;
          case $scope.views.importLeads:
            $scope.campaignId = campaign.campaign.proposal_id;
            $scope.campaignName = campaign.campaign.name;
            break;
          case $scope.views.createForm:
            break;
          case $scope.views.enterLeads:
             
            break;
          case $scope.views.viewLeadsBySupplier:
            $scope.getEntryListLeads();
            break; 
          case $scope.views.viewLeadsByFormCampaign:
            $scope.getEntryListLeadsByForm(campaign);
            break;
        }
      }

      var getCampaignLeadForms = function(campaignId){
        campaignLeadsService.getCampaignLeadForms(campaignId)
        .then(function onSuccess(response){
          $scope.leadForms = response.data.data;
        }).catch(function onError(response){
          console.log(response);
        })
      }

      var getShortlistedSuppliers = function(campaignId){
        campaignLeadsService.getShortlistedSuppliers(campaignId)
        .then(function onSuccess(response){
          $scope.suppliers = [];
          $scope.shortlisted_suppliers = response.data.data;
          for(var centerId in $scope.shortlisted_suppliers){
            for(var supplierType in $scope.shortlisted_suppliers[centerId].suppliers){
              angular.forEach($scope.shortlisted_suppliers[centerId].suppliers[supplierType], function(supplier){
                supplier['supplierCode'] = supplierType;
              })
              angular.extend($scope.suppliers,$scope.shortlisted_suppliers[centerId].suppliers[supplierType]);
            }
          }
          if($scope.shortlisted_suppliers.dynamic_suppliers.length){
            $scope.suppliers = $scope.suppliers.concat($scope.shortlisted_suppliers.dynamic_suppliers);            
          }
        }).catch(function onError(response){
          console.log(response);
        })
      }

      $scope.getLeadForm = function(item){
     
        
        $scope.updateForm = false;
        $scope.formName.name = undefined;
        $scope.leadFormFields = [];
        if(item){
          $scope.item = item;
          var new_hotness_mapping = {};
          angular.forEach(item.hotness_mapping, function(key,value){
            angular.forEach(item.global_hot_lead_criteria, function(keys,values){
              if(value == values){
                new_hotness_mapping[value] = key
              }
            })
          })  
          item.hotness_mapping =  new_hotness_mapping 
          $scope.newLeadFormFields = [];
          $scope.addNewLeadFormField();
          $scope.updateForm = true;
          $scope.leads_form_id = item.leads_form_id;
          $scope.formName.name = item.leads_form_name;
          $scope.leadFormFields = item.leads_form_items;
          setCriteria(item.global_hot_lead_criteria);        
          setAliasMapping(item.hotness_mapping); 
        }
        else{
          $scope.leadFormFields.push(angular.copy(leadFormField));
          $scope.globalHotLeadCriteria=[{
            name: "is_hot_level_" + 1,
            operation: [
              {
                name : 'or',
                items: []
              }        
            ]
          }]
        }
        $scope.changeView('createForm',$scope.campaignInfo);
      }

      // start : to read excel sheet while importing lead sheet
      $scope.read = function(workbook){
        var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
				var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
        $scope.importLeadsData = data;
        if($scope.importLeadsData.length && $scope.aliasData){
          $scope.$apply(function(){
            $scope.showImportTable = true;
            checkHeaders(headerNames);
            createBulkLeadsList($scope.importLeadsData,$scope.aliasData,headerNames);
           });

        }
      }

      // START : check sheet headers with aliasData headers
      var checkHeaders = function(headersList){
        var error = false;
        var headers = [];
        angular.forEach($scope.aliasData, function(alias,index){
          if(!(alias.alias == headersList[index])){
            alert("error in header field " + alias.alias + 'and' + headersList[index]);
            error = true;
          }
          headers.push(alias.alias);
        })
        if(error){
          alert("Header Sequence should be :" + headers);
        }
      }
      // END : check sheet headers with aliasData headers

      //START : to reset sheet data
      $scope.resetData = function(){
        $scope.importLeadsData = [];
        $scope.showImportTable = false;
      }
      //END : to reset sheet data

      // START : create list of leads to bulk insert
      var createBulkLeadsList = function(importLeadsData, aliasData, headers){
        formatedLeadsList = [];
        for(var i=0; i<importLeadsData.length; i++){
          var data = {};
          if(!(headers.indexOf('SUPPLIER_ID') > -1)){
            alert('There is No SUPPLIER_ID Column, Please Add and ReInsert the Sheet');
            $scope.resetData();
            break;
          }
          data['campaign_id'] = $scope.campaignId;
          data['object_id'] = importLeadsData[i].SUPPLIER_ID;
          for(var j=0; j<aliasData.length; j++){
            data[aliasData[j].original_name] = importLeadsData[i][aliasData[j].alias];
          }
          formatedLeadsList.push(data);
        }
      }
      // END : create list of leads to bulk insert

      // START: call to create leads API through sheet
      $scope.importLeadsThroughSheet = function(){
        $scope.importLeadsSuccess = true;
        var token = $rootScope.globals.currentUser.token;
        if ($scope.file) {
          Upload.upload({
              url: constants.base_url + constants.url_base_leads + $scope.leadFormFields.leads_form_id + "/import_lead",

              data: {
                file: $scope.file,
                data_import_type : "base-data"
              },
              headers: {'Authorization': 'JWT ' + token}
          }).then(function onSuccess(response){
                $scope.importLeadsSuccess = false;
                var dataDict = response.data.data
                for (var key in dataDict){
                    if (dataDict.unresolved_societies.length>0){
                      swal("Unresolved societies", dataDict.unresolved_societies);
                    } else if (dataDict.missing_societies.length>0){
                      swal("Missing societies", dataDict.missing_societies);
                    }else if (dataDict.not_present_in_shortlisted_societies.length>0){
                      swal("Not present in shortlisted societies", dataDict.not_present_in_shortlisted_societies);
                    }else if (dataDict.inv_activit_missing_societies.length>0){
                      swal("Inventory activity missing societies", dataDict.inv_activit_missing_societies);
                    }else if (dataDict.more_than_ones_same_shortlisted_society.length>0){
                      swal("More than ones same shortlisted society", dataDict.more_than_ones_same_shortlisted_society);
                    }else if (dataDict.inv_activity_assignment_missing_societies.length>0){
                      swal("Inventory activity assignment missing societies", dataDict.inv_activity_assignment_missing_societies);
                    }else if (dataDict.inv_activity_assignment_activity_date_missing_societies.length>0){
                      swal("Inventory activity assignment activity date missing societies", dataDict.inv_activity_assignment_activity_date_missing_societies);
                    }else{
                      swal(constants.name,constants.create_success,constants.success);
                    }
                }
                // swal(constants.name,constants.create_success,constants.success);
          })
          .catch(function onError(response) {
              console.log(response);
              $scope.importLeadsSuccess = false;
              var errorDataDict = response.data.data
              for (var key in errorDataDict){
                if (errorDataDict.general_error){
                  swal("Neither apartment nor club found in the sheet")
                }
              }
            });
      }
      }
      // END:   call to create leads API through sheet
      // START: add lead form fields
      $scope.upload = function (file,proposal_id) {
        $scope.uploadfile = false;
        var uploadUrl = constants.base_url + constants.url_base;
        var token = $rootScope.globals.currentUser.token;
        if(file){
          Upload.upload({
              url: uploadUrl + proposal_id + '/import_lead/',
              data: {file: file, 'username': $scope.username},
              headers: {'Authorization': 'JWT ' + token},
          }).then(function (response) {
            $scope.uploadfile = true;
            swal(constants.name,constants.uploadfile_success,constants.success);
            // uploadFileToAmazonServer(response.data.data,file);
          }).catch(function onError(response) {
            console.log(response);
            commonDataShare.showErrorMessage(response);
            // swal(constants.name,constants.errorMsg,constants.error);
            $scope.uploadfile = true;
            // commonDataShare.showMessage(constants.importfile_error);
          });
        }
      };


      $scope.addLeadFormFields = function(){
        $scope.leadFormFields.push(angular.copy(leadFormField));
      }
      $scope.addNewLeadFormField = function(){
        $scope.newLeadFormFields.push(angular.copy(leadFormField));
      }


      // END: add lead form fields
      $scope.addKeyOption = function(option,index){

        if($scope.leadFormFields && ($scope.leadFormFields[index] && (!$scope.leadFormFields[index].hasOwnProperty('key_options') || $scope.leadFormFields[index].key_options==null || $scope.leadFormFields[index].key_options.length == 0))){
          $scope.leadFormFields[index]['key_options'] = [];
        }else if($scope.leadFormFields[index]['key_options'].indexOf(option) !== -1) {
             swal("already exists!")
             return true;
        }
        
        $scope.leadFormFields[index]['key_options'].push(option);
        $scope.option = undefined;
        $scope.leadFormFields[index].optionForm.option = '';
      }

      $scope.addNewKeyOption = function(option,index){

        if($scope.newLeadFormFields && ($scope.newLeadFormFields[index] && (!$scope.newLeadFormFields[index].hasOwnProperty('key_options') || $scope.newLeadFormFields[index].key_options==null || $scope.newLeadFormFields[index].key_options.length == 0))){
          $scope.newLeadFormFields[index]['key_options'] = [];
        }else if($scope.newLeadFormFields[index]['key_options'].indexOf(option) !== -1) {
             swal("already exists!")
             return true;
       }

        $scope.newLeadFormFields[index]['key_options'].push(option);
        $scope.optionForm.option = undefined;
        $scope.newLeadFormFields[index].optionForm.option = '';
      }

      $scope.updateKeyOption = function(option,index){
        
        if(!$scope.newLeadFormFields[index].hasOwnProperty('key_options') || $scope.newLeadFormFields[index].key_options.length == 0){
            $scope.newLeadFormFields[index]['key_options'] = [];
        }
        $scope.newLeadFormFields[index]['key_options'].push(option);
        $scope.optionForm.option = undefined;
      }

      $scope.getMultipleLeadForms = function(supplier){
        $scope.changeView('viewLeadForms',$scope.campaignInfo);
      }

      $scope.enterLeads = function(supplier){
        $scope.leadModelData = [];
        $scope.leadModelData = angular.copy($scope.leadFormFields.leads_form_items);
        $scope.leadFormId = $scope.leadFormFields.leads_form_id;
        $scope.changeView('enterLeads',$scope.campaignInfo,$scope.leadFormFields);
        $scope.supplierData = supplier;
        $scope.getEntryListLeadsCount();
      }

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
        campaignLeadsService.saveLeads($scope.leadFormId,data)
        .then(function onSuccess(response){
          $scope.leadModelData = [];
          $scope.leadModelData = angular.copy($scope.leadFormFields.leads_form_items);
          $scope.getEntryListLeadsCount();
          swal(constants.name, constants.add_data_success, constants.success);
        }).catch(function onError(response){
          console.log(response);
        })

      }

      $scope.updateSelection = function(position, option) {
        angular.forEach(option, function(item, index) {
          if (position != index)
            item.value = false;
        });
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
      $scope.uploadFiles = function(file){
        $scope.file = file;
      }
      $scope.setHotLeadValue = function(item,value){
        if(value){
          item.value = item.hot_lead_criteria;
        }else{
          item.value = null;
        }
      }

      $scope.uploadFiles = function(file){
               $scope.file = file;
      }
      $scope.getExportedSheet = function(){
        $scope.exportedFile = undefined;
        campaignLeadsService.getExportedSheet($scope.leadFormFields.leads_form_id)
        .then(function onSuccess(response){

          $scope.exportedFile = response.data.data.filepath;
        }).catch(function onError(response){
          console.log(response);
        })
      }

      $scope.updateLeadForm = function(){
        campaignLeadsService.updateLeadForm($scope.leads_form_id,$scope.newLeadFormFields)
        .then(function onSuccess(response){
          $scope.newLeadFormFields = [];
          $('#addNewLeadFormFields').modal('hide');
          swal(constants.name,constants.add_data_success, constants.success);
          $scope.changeView('viewLeadForms',$scope.campaignInfo);
        }).catch(function onError(response){
          console.log(response);
        })
      }
      $scope.removeFieldFromForm = function(item){
        var data = {};
        campaignLeadsService.removeFieldFromForm($scope.leads_form_id,item.item_id, data)
        .then(function onSuccess(response){
          swal(constants.name,constants.delete_success, constants.success);
          $scope.changeView('viewLeadForms',$scope.campaignInfo);
        }).catch(function onError(response){
        })
      }

  $scope.updateFormFields  = function(){
    var data = {
      leads_form_name : $scope.formName.name,
      leads_form_items : $scope.leadFormFields,
      global_hot_lead_criteria: $scope.createCriteriaObject(),
      hotness_mapping: $scope.hotnessMapping
    }
    
    angular.forEach(data.leads_form_items, function(item,index){
      item.order_id = parseInt(index);
    })
    campaignLeadsService.updateFormFields($scope.leads_form_id,data,$scope.campaignId)
    .then(function onSuccess(response){
      // $scope.leadFormFields = [];
      // $scope.formName.name = undefined;
      // if(document.getElementById("globalHotLeadsCriteria").style.display == 'block'){
      //   angular.element('#globalHotLeadsCriteria').modal('hide');
      //    // document.getElementById("globalHotLeadsCriteria").modal('toggle');
      // }
      // swal(constants.name,constants.update_success,constants.success);
      //  $scope.changeView('viewLeadForms',$scope.campaignInfo);
      swal(constants.name,constants.update_success,constants.success);
      angular.element('#globalHotLeadsCriteria').modal('hide');
    }).catch(function onError(response){
      console.log(response);
    })
  }

  var setCriteria = function(data){
    $scope.globalHotLeadCriteria = [];
    angular.forEach(data, function(values, key){
      var tempData = {
        name : key,
        operation: []        
      }
      angular.forEach(values, function(oValues, oKey){
        var opData = {
          name: oKey,
          items: []
        } 
        angular.forEach(oValues, function(item,itemKey){
          var itemData = {
            id: itemKey,
            values: item
          }
          opData.items.push(itemData);
        })
        tempData.operation.push(opData);
      })
      $scope.globalHotLeadCriteria.push(tempData);
    })
  }
  $scope.createCriteriaObject = function(){
    var globalHotLeadCriteriaObject = {};
      angular.forEach($scope.globalHotLeadCriteria, function(data){
        globalHotLeadCriteriaObject[data.name] = {};
        angular.forEach(data.operation, function(operation){
          globalHotLeadCriteriaObject[data.name][operation.name] = {};
          angular.forEach(operation.items, function(item){
            globalHotLeadCriteriaObject[data.name][operation.name][item.id] = item.values;
          })
        })
      })
      return globalHotLeadCriteriaObject;
  }
  $scope.addFieldInCriteria = function(data,field){    
    data.push({
      id: field,
      values: []
    })
  }
  $scope.addOperationInCriteria = function(data){
    data.push({
      name: undefined,
      items: []
    })
  }
  $scope.addCriteria = function(){
    if(!$scope.globalHotLeadCriteria){
      $scope.globalHotLeadCriteria = [];
    }
    $scope.globalHotLeadCriteria.push({
      name: "is_hot_level_" + ($scope.globalHotLeadCriteria.length + 1),
      operation: [
        {
          name : 'or',
          items: []
        }        
      ]
    })   
  }
  $scope.removeglobalHot = function(index,item){
    $scope.globalHotLeadCriteria.splice(index,1); 
    var new_hotness_mapping = {};
    angular.forEach($scope.item.hotness_mapping, function(key,value){
      angular.forEach($scope.item.global_hot_lead_criteria, function(keys,values){
        if(values == item.name){
          values = '';
        }
        if(value == values){
          new_hotness_mapping[value] = key
        }
      })
    })  
    $scope.item.hotness_mapping =  new_hotness_mapping 
    setAliasMapping($scope.item.hotness_mapping); 
  }

  var setAliasMapping = function(data){
    if(data){
      $scope.textValue={};
      $scope.hotnessMapping = {};
      $scope.hotnessMapping = data;
    }else{
      $scope.textValue={};
      $scope.hotnessMapping = {};
     //$scope.hotnessMapping = {}; 
    }
  }
 
  $scope.clearTextValue = function() {
    $scope.textValue = {};
    $scope.textValue.value = "";
    //$scope.textValue.value = "";
  }

  $scope.getEditLeads = function(entryId) {
    $scope.entryId = entryId;
    campaignLeadsService.getEditLeads($scope.leadFormId, $scope.supplierData.supplier_id, entryId)
      .then(function onSuccess(response) {

        if (response.data && response.data.data && response.data.data.leads_form_items && response.data.data.leads_form_items) {
            for(let i in response.data.data.leads_form_items){
              if(response.data.data.leads_form_items[i].key_type == "DATE"){
                response.data.data.leads_form_items[i].value = new Date(response.data.data.leads_form_items[i].value)
              } 
            }
        }
       
        $scope.leadModelData = response.data.data.leads_form_items;
        $scope.views.viewLeadsBySupplier = false;
        $scope.views.viewLeadsByFormCampaign = false;
        $scope.views.showLeads = false;
        $scope.views.showLeads = false;
        $scope.views.enterLeads = true;

      }).catch(function onError(response) {})
  }

  $scope.updateLeadDetails = function(){
    campaignLeadsService.updateLeadDetails($scope.leadFormId,$scope.supplierData.supplier_id,$scope.entryId,$scope.leadModelData)
      .then(function onSuccess(response){
           $scope.viewLeads = false; 
          $scope.views.enterLeads = true;
          swal(constants.name, constants.update_leads_data_success, constants.success);
      }).catch(function onError(response){
            
      })
  }

});//Controller ends here

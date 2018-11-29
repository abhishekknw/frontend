'use strict';


 angular.module('catalogueApp')
 .factory('enterLeadsService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location',
  function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location) {

    var url_base = 'v0/ui/website/';
    var url_base_leads = 'v0/ui/leads/';

    var enterLeadsService = {};


        enterLeadsService.getLeads = function(campaignId){
          var url = url_base + "leads/?campaign_id=" + campaignId;
          return machadaloHttp.get(url);
        }
        enterLeadsService.getEntryListLeads = function(formId, supplierId){
          var url = url_base_leads + formId + "/entry_list/"  + supplierId;
          return machadaloHttp.get(url);
        }

        enterLeadsService.saveLeads = function(formId, data){
          var url = url_base_leads + formId + "/insert_lead";
          return machadaloHttp.post(url, data);
        }


        enterLeadsService.updateLeadForm = function(formId, data){
          var url = url_base_leads + formId + "/add_fields";
          return machadaloHttp.put(url,data);
        }

        enterLeadsService.removeFieldFromForm = function(formId, itemId, data){
          var url = url_base_leads + formId + "/delete_form_element/" + itemId;
          return machadaloHttp.put(url,data);
        }
        return enterLeadsService;

 }]);
